"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoImage from "@/assets/image.png";
import { SAMPLE_HTML } from "@/lib/sample-text";
import RichTextEditor from "@/components/rich-text-editor";
import { toast } from "sonner";
import type { JSONContent } from "@tiptap/react";
import { supabase } from "@/utils/supabase";

// Import components
import {
  LoadingOverlay,
  BlockedOverlay,
  DifferenceView,
  ActionButtons,
  PreviewModal,
  SubmitModal,
} from "@/components/scenario";

// Import diff comparison hook
import { useDiffComparison } from "@/hooks/useDiffComparison";

export default function Home() {
  const router = useRouter();

  // Editor state
  const [userText, setUserText] = useState("");
  const [userHtml, setUserHtml] = useState("");
  const [userJson, setUserJson] = useState<JSONContent | null>(null);

  // UI state
  const [showDiff, setShowDiff] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [agreeToSubmit, setAgreeToSubmit] = useState(false);

  // Loading state
  const [isSaving, setIsSaving] = useState(false);
  const [checkingSubmission, setCheckingSubmission] = useState(true);
  const [hasFinalSubmission, setHasFinalSubmission] = useState(false);

  // Use diff comparison hook
  const {
    removalCount,
    additionCount,
    highlightedOriginalHtml,
    highlightedUserHtml,
  } = useDiffComparison(userText, userHtml);

  // Check user and submission status on mount
  useEffect(() => {
    const checkUserAndSubmission = async () => {
      setCheckingSubmission(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/");
        return;
      }

      const { data: finalLetters, error: letterError } = await supabase
        .from("letter")
        .select("id")
        .eq("studentID", user.id)
        .eq("isFinal", true)
        .limit(1);

      if (letterError) {
        setCheckingSubmission(false);
        return;
      }

      if (finalLetters && finalLetters.length > 0) {
        setHasFinalSubmission(true);
      }

      setCheckingSubmission(false);
    };

    checkUserAndSubmission();
  }, [router]);

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to save your letter.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("letter").insert({
      letterText: userText,
      letterJson: userJson,
      studentID: user.id,
      isFinal: false,
    });

    if (error) {
      setIsSaving(false);
      toast.error("Failed to save letter");
      return;
    }

    setIsSaving(false);
    toast.success("Letter saved successfully!");
  };

  // Open preview modal
  const handlePreviewModal = () => {
    if (!userText || userText.trim() === "" || !userJson) {
      toast.error("Please write some text to save your progress.");
      return;
    }
    setShowPreviewModal(true);
  };

  // Reset handler
  const handleReset = () => {
    setUserText("");
    setUserHtml("");
    setUserJson(null);
    setShowDiff(false);
  };

  // Open submit modal
  const handleSubmit = () => {
    if (hasFinalSubmission) {
      toast.error("You have already submitted a final letter.");
      return;
    }

    if (!userText || userText.trim() === "" || !userJson) {
      toast.error("Please write some text to submit.");
      return;
    }

    setAgreeToSubmit(false);
    setShowSubmitModal(true);
  };

  // Close submit modal
  const closeSubmitModal = () => {
    setShowSubmitModal(false);
    setAgreeToSubmit(false);
  };

  // Final submit handler
  const handleFinalSubmit = async () => {
    if (hasFinalSubmission) {
      toast.error("You have already submitted a final letter.");
      return;
    }

    if (!agreeToSubmit) {
      toast.error("Please agree to submit your letter before proceeding.");
      return;
    }

    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to submit your letter.");
      setIsSaving(false);
      return;
    }

    // Double-check for existing final submission
    const { data: existingFinal } = await supabase
      .from("letter")
      .select("id")
      .eq("studentID", user.id)
      .eq("isFinal", true)
      .limit(1);

    if (existingFinal && existingFinal.length > 0) {
      toast.error("You have already submitted a final letter.");
      setIsSaving(false);
      setHasFinalSubmission(true);
      return;
    }

    const { error } = await supabase.from("letter").insert({
      letterText: userText,
      letterJson: userJson,
      studentID: user.id,
      isFinal: true,
    });

    if (error) {
      setIsSaving(false);
      toast.error("Failed to submit letter");
      return;
    }

    setIsSaving(false);
    setShowSubmitModal(false);
    toast.success("Letter submitted successfully!");

    setTimeout(() => {
      router.push("/home/chatbot");
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen p-8 relative">
      {/* Overlays */}
      {checkingSubmission && <LoadingOverlay />}
      {hasFinalSubmission && !checkingSubmission && <BlockedOverlay />}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            Editing Your Law Letter to Client
          </h1>
          <Image
            src={logoImage}
            alt="logo"
            width={157}
            height={40}
            className="w-30 h-30"
          />
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RichTextEditor
            title="Sample Letter"
            content={SAMPLE_HTML}
            editable={false}
            showWordCount={true}
          />
          <RichTextEditor
            title="Your Letter"
            content={userHtml}
            onChange={setUserHtml}
            onTextChange={setUserText}
            onJsonChange={setUserJson}
            editable={true}
            disablePaste={false}
            showWordCount={true}
          />
        </div>
      </div>

      {/* Difference View */}
      {showDiff && (
        <DifferenceView
          removalCount={removalCount}
          additionCount={additionCount}
          highlightedOriginalHtml={highlightedOriginalHtml}
          highlightedUserHtml={highlightedUserHtml}
          userHtml={userHtml}
          onClose={() => setShowDiff(false)}
        />
      )}

      {/* Action Buttons */}
      <ActionButtons
        hasFinalSubmission={hasFinalSubmission}
        checkingSubmission={checkingSubmission}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onViewChanges={() => setShowDiff(true)}
        onSave={handlePreviewModal}
      />

      {/* Modals */}
      {showPreviewModal && (
        <PreviewModal
          userHtml={userHtml}
          userText={userText}
          isSaving={isSaving}
          onClose={() => setShowPreviewModal(false)}
          onSave={handleSave}
        />
      )}

      {showSubmitModal && (
        <SubmitModal
          userHtml={userHtml}
          userText={userText}
          isSaving={isSaving}
          agreeToSubmit={agreeToSubmit}
          onAgreeChange={setAgreeToSubmit}
          onClose={closeSubmitModal}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
}
