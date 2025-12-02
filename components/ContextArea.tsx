"use client";

import { AlertCircle, WholeWord, FilePen } from "lucide-react";
import { useMemo } from "react";

interface ContextAreaProps {
  mode: "sample" | "typing";
  title?: string;
  sampleText?: string;
  value?: string;
  onChange?: (value: string) => void;
  disableSelection?: boolean;
}

export function ContextArea({
  mode,
  title,
  sampleText = "Sample Text",
  value = "",
  onChange,
  disableSelection = false,
}: ContextAreaProps) {
  const wordCount = useMemo(() => {
    const baseText = mode === "typing" ? value : sampleText;
    return baseText.trim() === "" ? 0 : baseText.trim().split(/\s+/).length;
  }, [value, sampleText, mode]);

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
          <FilePen className="w-6 h-6 text-gray-800 shrink-0" />
        </div>
        <h3 className="text-gray-900 text-xl font-bold">
          {title || (mode === "sample" ? "Sample Text" : "Your Text")}
        </h3>
      </div>

      <div
        className={
          "bg-gray-50 rounded-lg p-4 min-h-[500px] flex-1 " +
          (disableSelection ? "select-none" : "")
        }
      >
        {mode === "sample" ? (
          <p className="text-gray-800 leading-relaxed">{sampleText}</p>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Type your text here..."
            className="w-full h-full bg-transparent text-gray-800 leading-relaxed resize-none outline-none placeholder:text-gray-400"
          />
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <div
          className="
      flex items-center justify-between
      rounded-2xl 
      px-5 py-4
      border border-red-100 
      bg-[#FFF5F5]      /* SOFT pastel red */
      shadow-sm
    "
        >
          {/* Label + Icon */}
          <div className="flex items-center gap-2">
            <WholeWord className="w-5 h-5 text-mq-red" />
            <span className="text-sm font-medium text-mq-red">Word Count</span>
          </div>

          {/* Value */}
          <span className="text-md font-bold text-red-700">{wordCount}</span>
        </div>
      </div>
    </div>
  );
}
