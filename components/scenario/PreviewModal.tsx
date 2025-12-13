"use client";

import { FileText, Save, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface PreviewModalProps {
  userHtml: string;
  userText: string;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
}

export function PreviewModal({
  userHtml,
  userText,
  isSaving,
  onClose,
  onSave,
}: PreviewModalProps) {
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
                  Preview Your Letter
                </h3>
                <p className="text-sm text-white/80">
                  Review your letter before saving as draft
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
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
              onClick={async () => {
                await onSave();
                onClose();
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
  );
}
