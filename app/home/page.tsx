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
import { FileText, Redo2, RotateCcw, Save, Send } from "lucide-react";
import RichTextEditor from "@/components/rich-text-editor";

const SAMPLE = SAMPLE_TEXT;

export default function Home() {
  const router = useRouter();
  const [userText, setUserText] = useState(""); // plain text for diff
  const [showDiff, setShowDiff] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSave = () => {
    console.log("Saving...");
  };

  // Create formatted text with highlights for the left side (original with removals)
  const highlightedOriginalHtml = useMemo(() => {
    const hasMatches = diffParts.some((part) => !part.added && !part.removed);

    if (!userText || userText.trim() === "" || !hasMatches) {
      // Highlight everything in red
      return SAMPLE_HTML.replace(/>([^<]+)</g, (match, textContent) => {
        if (!textContent.trim()) return match;
        return `><mark style="background-color: #fecaca; color: #991b1b; padding: 0 2px; border-radius: 2px;">${textContent}</mark><`;
      });
    }

    // Build HTML string with highlights from diff parts
    let html = "";

    diffParts.forEach((part) => {
      if (part.added) return; // Skip added parts for left side

      const text = part.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");

      if (part.removed) {
        html += `<mark style="background-color: #fecaca; color: #991b1b; padding: 0 2px; border-radius: 2px;">${text}</mark>`;
      } else {
        html += text;
      }
    });

    return `<div>${html}</div>`;
  }, [diffParts, userText]);

  // Create HTML for user's text with green highlights for additions
  const highlightedUserHtml = useMemo(() => {
    if (!userText) return "";

    let html = "";
    diffParts.forEach((part) => {
      if (part.removed) return;

      const escaped = part.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>");

      if (part.added) {
        html += `<mark style="background-color: #bbf7d0; color: #166534; padding: 0 2px; border-radius: 2px;">${escaped}</mark>`;
      } else {
        html += escaped;
      }
    });

    return `<p>${html}</p>`;
  }, [diffParts, userText]);

  return (
    <div className="bg-white min-h-screen p-8">
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
            onTextChange={setUserText}
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* LEFT – Original with removals */}
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
                  Original Letter
                </h3>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto">
                <div
                  className="prose prose-sm max-w-none [&_p]:mb-4 [&_p:first-child]:text-right [&_p:first-child]:font-semibold [&_strong]:font-semibold [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
                  dangerouslySetInnerHTML={{ __html: highlightedOriginalHtml }}
                />
              </div>
            </div>

            {/* RIGHT – User's version with additions */}
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
                  Your Rewrite
                </h3>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto">
                {userText ? (
                  <div
                    className="prose prose-sm max-w-none [&_p]:mb-4 [&_mark]:rounded [&_mark]:px-0.5"
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
          <AlertDialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              // Prevent closing if submission is in progress
              if (!open && userSubmitted) return;
              setIsDialogOpen(open);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button className="flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer">
                <Send className="w-7 h-7 text-red-500" />
                <span className="text-lg">Submit</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to submit?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will not be able to change your answer after submitting.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={userSubmitted}
                  className="bg-white text-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-300"
                >
                  Cancel
                </AlertDialogCancel>
                <Button
                  className="text-base font-semibold rounded-lg border-2 bg-bright-red text-white active:scale-95 transition-all duration-200"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (userSubmitted) return;
                    setUserSubmitted(true);
                    // Wait for 2 seconds before navigating (dialog stays open during this time)
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    router.push("/home/chatbot");
                  }}
                  disabled={userSubmitted}
                >
                  {userSubmitted ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      <span className="ml-2">Please wait</span>
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            onClick={() => {
              setUserText("");
              setShowDiff(false); // hide diff on reset
            }}
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
            onClick={handleSave}
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
    </div>
  );
}
