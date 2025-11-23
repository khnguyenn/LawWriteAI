"use client";

import { AlertCircle, WholeWord } from "lucide-react";
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
        <div className="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
          <AlertCircle className="w-3 h-3 text-gray-800 shrink-0" />
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
        <div className="bg-gradient-to-r from-red-50 to-red-100 px-4 py-3 rounded-lg border border-red-200 shadow-sm">
          <p className="font-semibold text-gray-800 flex items-center gap-2.5">
            <WholeWord className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-sm">
              Word Count:{" "}
              <span className="text-red-600 font-bold text-base">
                {wordCount}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
