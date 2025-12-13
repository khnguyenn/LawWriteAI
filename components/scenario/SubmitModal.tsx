"use client";

import { FileText, Send, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

interface SubmitModalProps {
  userHtml: string;
  userText: string;
  isSaving: boolean;
  agreeToSubmit: boolean;
  onAgreeChange: (checked: boolean) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

export function SubmitModal({
  userHtml,
  userText,
  isSaving,
  agreeToSubmit,
  onAgreeChange,
  onClose,
  onSubmit,
}: SubmitModalProps) {
  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;

  return (
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
              onClick={onClose}
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

        {/* Warning and Agreement Section */}
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
                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
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
                  <strong>Warning:</strong> You cannot edit or go back once you
                  submit your letter
                </span>
              </div>
              <div
                className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  agreeToSubmit
                    ? "border-green-400 bg-green-100"
                    : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
                onClick={() => onAgreeChange(!agreeToSubmit)}
              >
                <Checkbox
                  className="w-5 h-5 mt-0.5"
                  id="submit-checkbox"
                  checked={agreeToSubmit}
                  onCheckedChange={(checked) => onAgreeChange(checked === true)}
                />
                <label
                  htmlFor="submit-checkbox"
                  className="cursor-pointer text-sm flex-1"
                >
                  <strong className="text-charcoal">
                    I have reviewed my letter and agree to submit it as final. I
                    understand I cannot make changes after submission.
                  </strong>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Word count:</span> {wordCount} words
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSaving || !agreeToSubmit}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed flex items-center gap-2 ${
                agreeToSubmit && !isSaving
                  ? "bg-mq-red text-white hover:bg-mq-red/90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              title={!agreeToSubmit ? "Please agree to the terms above" : ""}
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
  );
}
