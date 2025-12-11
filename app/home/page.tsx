"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { diffWords } from "diff";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import logoImage from "@/assets/image.png";
import { SAMPLE_TEXT, SAMPLE_HTML } from "@/lib/sample-text";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FileText, Redo2, RotateCcw, Save, Send, X, Lock } from "lucide-react";
import RichTextEditor from "@/components/rich-text-editor";
import { toast } from "sonner";
import type { JSONContent } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { supabase } from "@/utils/supabase";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

const SAMPLE = SAMPLE_TEXT;

export default function Home() {
  const router = useRouter();
  const [userText, setUserText] = useState(""); // plain text for diff
  const [userHtml, setUserHtml] = useState(""); // formatted HTML for preview
  const [userJson, setUserJson] = useState<JSONContent | null>(null); // rich JSON for saving
  const [showDiff, setShowDiff] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [agreeToSubmit, setAgreeToSubmit] = useState(false);
  const [hasFinalSubmission, setHasFinalSubmission] = useState(false);
  const [checkingSubmission, setCheckingSubmission] = useState(true);

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

      // Check if user already has a final submission
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

  // Compare plain text (not HTML)
  const diffParts = useMemo(() => diffWords(SAMPLE, userText), [userText]);

  const leftSegments = useMemo(
    () =>
      diffParts.map((part, i) => {
        if (part.added) return null;
        if (part.removed) {
          return (
            <span key={i} className="bg-red-200 text-red-800 px-1 rounded">
              {part.value}
            </span>
          );
        }
        return <span key={i}>{part.value}</span>;
      }),
    [diffParts]
  );

  const rightSegments = useMemo(
    () =>
      diffParts.map((part, i) => {
        if (part.removed) return null;
        if (part.added) {
          return (
            <span key={i} className="bg-green-200 text-green-800 px-1 rounded">
              {part.value}
            </span>
          );
        }
        return <span key={i}>{part.value}</span>;
      }),
    [diffParts]
  );

  const removalCount = useMemo(
    () =>
      diffParts.reduce((sum, part) => {
        if (!part.removed) return sum;
        const words = part.value.trim().split(/\s+/).filter(Boolean);
        return sum + words.length;
      }, 0),
    [diffParts]
  );

  const additionCount = useMemo(
    () =>
      diffParts.reduce((sum, part) => {
        if (!part.added) return sum;
        const words = part.value.trim().split(/\s+/).filter(Boolean);
        return sum + words.length;
      }, 0),
    [diffParts]
  );

  // Helper to apply diff highlights to HTML while preserving formatting
  const applyHighlightsToHtml = (
    html: string,
    plainText: string,
    showRemoved: boolean
  ) => {
    if (!html || !plainText) return html;

    // Create a map of character positions to highlight
    const highlightMap = new Map<number, "removed" | "added">();
    let charPos = 0;

    diffParts.forEach((part) => {
      if (showRemoved && part.removed) {
        // Mark positions to highlight in red
        for (let i = 0; i < part.value.length; i++) {
          highlightMap.set(charPos + i, "removed");
        }
      } else if (!showRemoved && part.added) {
        // Mark positions to highlight in green
        for (let i = 0; i < part.value.length; i++) {
          highlightMap.set(charPos + i, "added");
        }
      }

      // Advance position for non-skipped parts
      if (showRemoved && !part.added) {
        charPos += part.value.length;
      } else if (!showRemoved && !part.removed) {
        charPos += part.value.length;
      }
    });

    // Parse HTML and apply highlights to text nodes
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    let currentPos = 0;

    const processNode = (node: Node): Node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";

        // Return empty nodes as-is
        if (!text) return node;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let inHighlight = false;
        let currentHighlight: "removed" | "added" | null = null;
        let highlightSpan: HTMLElement | null = null;

        for (let i = 0; i < text.length; i++) {
          const highlight = highlightMap.get(currentPos + i);

          if (highlight && highlight !== currentHighlight) {
            // Close previous highlight if any
            if (inHighlight && highlightSpan) {
              highlightSpan.appendChild(
                document.createTextNode(text.substring(lastIndex, i))
              );
              fragment.appendChild(highlightSpan);
              lastIndex = i;
            } else if (i > lastIndex) {
              fragment.appendChild(
                document.createTextNode(text.substring(lastIndex, i))
              );
              lastIndex = i;
            }

            // Start new highlight
            highlightSpan = document.createElement("mark");
            const bgColor = highlight === "removed" ? "#fecaca" : "#bbf7d0";
            const textColor = highlight === "removed" ? "#991b1b" : "#166534";
            highlightSpan.setAttribute(
              "style",
              `background-color: ${bgColor}; color: ${textColor}; padding: 2px 4px; border-radius: 3px; font-weight: 500;`
            );
            inHighlight = true;
            currentHighlight = highlight;
          } else if (!highlight && inHighlight) {
            // Close highlight
            if (highlightSpan) {
              highlightSpan.appendChild(
                document.createTextNode(text.substring(lastIndex, i))
              );
              fragment.appendChild(highlightSpan);
            }
            lastIndex = i;
            inHighlight = false;
            currentHighlight = null;
            highlightSpan = null;
          }
        }

        // Handle remaining text
        if (inHighlight && highlightSpan) {
          highlightSpan.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
          fragment.appendChild(highlightSpan);
        } else if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        } else if (lastIndex === 0 && text.length === 0) {
          // Empty text node
          fragment.appendChild(document.createTextNode(""));
        }

        currentPos += text.length;
        return fragment;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clone = node.cloneNode(false);
        for (let i = 0; i < node.childNodes.length; i++) {
          const processed = processNode(node.childNodes[i]);
          clone.appendChild(processed);
        }
        return clone;
      }

      return node.cloneNode(true);
    };

    const processedBody = document.createElement("div");
    for (let i = 0; i < doc.body.childNodes.length; i++) {
      const processed = processNode(doc.body.childNodes[i]);
      processedBody.appendChild(processed);
    }

    return processedBody.innerHTML;
  };

  // Apply inline highlights to formatted HTML
  const highlightedOriginalHtml = useMemo(() => {
    if (!userText || userText.trim() === "") {
      return SAMPLE_HTML;
    }
    return applyHighlightsToHtml(SAMPLE_HTML, SAMPLE, true);
  }, [diffParts, userText]);

  const highlightedUserHtml = useMemo(() => {
    if (!userHtml) return "";
    return applyHighlightsToHtml(userHtml, userText, false);
  }, [diffParts, userText, userHtml]);

  // Save the user's text and json to the database - SAVE BUTTON
  const handleSave = async () => {
    console.log("PLAIN TEXT:", userText);
    console.log("TIPTAP JSON:", userJson);

    setIsSaving(true);
    setIsLoading(true);

    // Save the user's text and json to the database
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      toast.error("You must be logged in to save your letter.");
      setIsSaving(false);
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("letter").insert({
      letterText: userText, // plain text
      letterJson: userJson, // TipTap JSON (jsonb column)
      studentID: user.id, // or your student table id if different
      isFinal: false,
    });

    if (error) {
      setIsSaving(false);
      setIsLoading(false);
      toast.error("Failed to save letter");
      return;
    }

    // SUCCESS
    setIsSaving(false);
    setIsLoading(false);
    toast.success("Letter saved successfully!");
  };

  const handlePreviewModal = () => {
    if (!userText || userText.trim() === "" || !userJson) {
      toast.error("Please write some text to save your progress.");
      return;
    }
    setShowPreviewModal(true);
  };

  // Handle reset
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUserText("");
    setUserHtml("");
    setUserJson(null);
    setShowDiff(false);
  };

  const handleSubmit = () => {
    if (hasFinalSubmission) {
      toast.error(
        "You have already submitted a final letter. You cannot submit another one."
      );
      return;
    }

    if (!userText || userText.trim() === "" || !userJson) {
      toast.error("Please write some text to submit.");
      return;
    }
    setAgreeToSubmit(false); // Reset checkbox when opening modal
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
    setAgreeToSubmit(false); // Reset checkbox when closing
  };

  const handleFinalSubmit = async () => {
    if (hasFinalSubmission) {
      toast.error(
        "You have already submitted a final letter. You cannot submit another one."
      );
      return;
    }

    if (!agreeToSubmit) {
      toast.error("Please agree to submit your letter before proceeding.");
      return;
    }

    setIsSaving(true);
    setIsLoading(true);

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to submit your letter.");
      setIsSaving(false);
      setIsLoading(false);
      return;
    }

    // Double-check if user already has a final submission
    const { data: existingFinal } = await supabase
      .from("letter")
      .select("id")
      .eq("studentID", user.id)
      .eq("isFinal", true)
      .limit(1);

    if (existingFinal && existingFinal.length > 0) {
      toast.error("You have already submitted a final letter.");
      setIsSaving(false);
      setIsLoading(false);
      setHasFinalSubmission(true);
      return;
    }

    const { error } = await supabase.from("letter").insert({
      letterText: userText,
      letterJson: userJson,
      studentID: user.id,
      isFinal: true, // Mark as final submission
    });

    if (error) {
      setIsSaving(false);
      setIsLoading(false);
      toast.error("Failed to submit letter");
      return;
    }

    // SUCCESS
    setIsSaving(false);
    setIsLoading(false);
    setShowSubmitModal(false);
    toast.success("Letter submitted successfully!");

    // Navigate to next page after short delay
    setTimeout(() => {
      router.push("/home/chatbot");
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen p-8 relative">
      {/* Loading/Checking Overlay */}
      {checkingSubmission && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-mq-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-charcoal">
              Checking your submission status...
            </p>
          </div>
        </div>
      )}

      {/* Blocked Overlay - User Already Submitted */}
      {hasFinalSubmission && !checkingSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-mq-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-mq-magenta" />
            </div>
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Final Submission Already Made
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              You have already submitted your final letter. You cannot create or
              submit additional letters.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/home/log")}
                className="px-6 py-3 bg-mq-magenta text-white font-semibold rounded-xl hover:bg-mq-magenta/90 transition-all"
              >
                View Your Submissions
              </button>
              <button
                onClick={() => router.push("/home/chatbot")}
                className="px-6 py-3 bg-charcoal text-white font-semibold rounded-xl hover:bg-charcoal/90 transition-all"
              >
                Go to Chatbot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Area Section */}
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
            disablePaste={true}
            showWordCount={true}
          />
        </div>
      </div>

      {/* Difference Section – only show when showDiff = true */}
      {showDiff && (
        <div className="max-w-7xl mx-auto mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Difference View
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red-200"></span>
                <span className="text-gray-600">
                  Removed ({removalCount} words)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green-200"></span>
                <span className="text-gray-600">
                  Added ({additionCount} words)
                </span>
              </span>
              <button
                onClick={() => setShowDiff(false)}
                className="ml-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close Comparison
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* LEFT – Original with removals highlighted */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                <h3 className="font-semibold text-red-700 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Sample Letter (red = removed)
                </h3>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto bg-white">
                <div
                  className="prose prose-sm max-w-none [&_p]:mb-4 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_mark]:inline"
                  dangerouslySetInnerHTML={{ __html: highlightedOriginalHtml }}
                />
              </div>
            </div>

            {/* RIGHT – User's version with additions highlighted */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-green-50 px-4 py-3 border-b border-green-100">
                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Your Letter (green = added)
                </h3>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto bg-white">
                {userHtml ? (
                  <div
                    className="prose prose-sm max-w-none [&_p]:mb-4 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_mark]:inline"
                    dangerouslySetInnerHTML={{ __html: highlightedUserHtml }}
                  />
                ) : (
                  <p className="text-gray-400 italic">
                    Start typing to see your rewrite here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button Section */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-6 flex-wrap">
          <Button
            className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={hasFinalSubmission || checkingSubmission}
          >
            {hasFinalSubmission ? (
              <>
                <Lock className="w-7 h-7 text-gray-400" />
                <span className="text-lg">Submission Locked</span>
              </>
            ) : (
              <>
                <Send className="w-7 h-7 text-red-500" />
                <span className="text-lg">Submit</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            disabled={isSaving}
            className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <RotateCcw className="w-7 h-7 text-blue-500" />
            <span className="text-lg">Reset</span>
          </Button>

          {/* Show Diff Button */}
          <Button
            onClick={() => setShowDiff(true)}
            className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <FileText className="w-7 h-7 text-indigo-500" />
            <span className="text-lg">View Changes</span>
          </Button>

          <Button
            onClick={handlePreviewModal}
            className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <Save className="w-7 h-7 text-blue-500" />
            <span className="text-lg">Save</span>
          </Button>

          <Button className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer">
            <Redo2 className="w-7 h-7 text-amber-500" />
            <span className="text-lg">Redo</span>
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-mq-red to-deep-red p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Preview Your Letter
                    </h3>
                    <p className="text-sm text-white/80">
                      Review your letter before saving as draft
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable Preview */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div
                  className="prose prose-sm max-w-none [&_p]:mb-4 [&_strong]:font-semibold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_.ProseMirror]:outline-none"
                  dangerouslySetInnerHTML={{ __html: userHtml }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Word count:</span>{" "}
                {userText.trim().split(/\s+/).filter(Boolean).length} words
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await handleSave();
                    setShowPreviewModal(false);
                  }}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-mq-red text-white hover:bg-mq-red/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Draft</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-mq-red to-deep-red p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Submit Your Letter
                    </h3>
                    <p className="text-sm text-white/80">
                      Review your letter before submitting
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeSubmitModal}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable Preview */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div
                  className="prose prose-sm max-w-none [&_p]:mb-4 [&_strong]:font-semibold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_.ProseMirror]:outline-none"
                  dangerouslySetInnerHTML={{ __html: userHtml }}
                />
              </div>
            </div>

            <div className="px-8 bg-gray-50 mb-5">
              <div
                className={`p-4 rounded-lg border-2 transition-all ${
                  agreeToSubmit
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50/50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <span className="text-red-700">
                      <strong>Warning:</strong> You cannot edit or go back once
                      you submit your letter
                    </span>
                  </div>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      agreeToSubmit
                        ? "border-green-400 bg-green-100"
                        : "border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setAgreeToSubmit(!agreeToSubmit)}
                  >
                    <Checkbox
                      className="w-5 h-5 mt-0.5"
                      id="submit-checkbox"
                      checked={agreeToSubmit}
                      onCheckedChange={(checked) =>
                        setAgreeToSubmit(checked === true)
                      }
                    />
                    <label
                      htmlFor="submit-checkbox"
                      className="cursor-pointer text-sm flex-1"
                    >
                      <strong className="text-charcoal">
                        I have reviewed my letter and agree to submit it as
                        final. I understand I cannot make changes after
                        submission.
                      </strong>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Word count:</span>{" "}
                {userText.trim().split(/\s+/).filter(Boolean).length} words
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeSubmitModal}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSaving || !agreeToSubmit}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed flex items-center gap-2 ${
                    agreeToSubmit && !isSaving
                      ? "bg-mq-red text-white hover:bg-mq-red/90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  title={
                    !agreeToSubmit ? "Please agree to the terms above" : ""
                  }
                >
                  {isSaving ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Final</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
