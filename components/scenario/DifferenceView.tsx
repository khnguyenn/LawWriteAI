"use client";

import { FileText } from "lucide-react";

interface DifferenceViewProps {
  removalCount: number;
  additionCount: number;
  highlightedOriginalHtml: string;
  highlightedUserHtml: string;
  userHtml: string;
  onClose: () => void;
}

export function DifferenceView({
  removalCount,
  additionCount,
  highlightedOriginalHtml,
  highlightedUserHtml,
  userHtml,
  onClose,
}: DifferenceViewProps) {
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Difference View</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-200"></span>
            <span className="text-gray-600">
              Removed ({removalCount} words)
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-200"></span>
            <span className="text-gray-600">Added ({additionCount} words)</span>
          </span>
          <button
            onClick={onClose}
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
              <FileText className="w-5 h-5" />
              Sample Letter
            </h3>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto bg-white">
            <div
              className="prose prose-sm max-w-none [&_p]:mb-2 [&_p]:leading-relaxed [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
              dangerouslySetInnerHTML={{ __html: highlightedOriginalHtml }}
            />
          </div>
        </div>

        {/* RIGHT – User's version with additions highlighted */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-green-50 px-4 py-3 border-b border-green-100">
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Your Letter
            </h3>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto bg-white">
            {userHtml ? (
              <div
                className="prose prose-sm max-w-none [&_p]:mb-2 [&_p]:leading-relaxed [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6"
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
  );
}
