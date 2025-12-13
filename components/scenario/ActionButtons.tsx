"use client";

import { Button } from "@/components/ui/button";
import { FileText, Redo2, RotateCcw, Save, Send, Lock } from "lucide-react";

interface ActionButtonsProps {
  hasFinalSubmission: boolean;
  checkingSubmission: boolean;
  isSaving: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onViewChanges: () => void;
  onSave: () => void;
}

export function ActionButtons({
  hasFinalSubmission,
  checkingSubmission,
  isSaving,
  onSubmit,
  onReset,
  onViewChanges,
  onSave,
}: ActionButtonsProps) {
  const buttonClass =
    "flex h-14 min-w-[190px] items-center gap-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-900 text-lg font-semibold shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer";

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex justify-center gap-6 flex-wrap">
        <Button
          className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={onSubmit}
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

        <Button onClick={onReset} disabled={isSaving} className={buttonClass}>
          <RotateCcw className="w-7 h-7 text-blue-500" />
          <span className="text-lg">Reset</span>
        </Button>

        <Button onClick={onViewChanges} className={buttonClass}>
          <FileText className="w-7 h-7 text-indigo-500" />
          <span className="text-lg">View Changes</span>
        </Button>

        <Button onClick={onSave} className={buttonClass}>
          <Save className="w-7 h-7 text-blue-500" />
          <span className="text-lg">Save</span>
        </Button>

        <Button className={buttonClass}>
          <Redo2 className="w-7 h-7 text-amber-500" />
          <span className="text-lg">Redo</span>
        </Button>
      </div>
    </div>
  );
}
