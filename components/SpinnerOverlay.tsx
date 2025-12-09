"use client";

import { Spinner } from "@/components/ui/spinner";

interface SpinnerOverlayProps {
  isVisible?: boolean;
}

export default function SpinnerOverlay({
  isVisible = false,
}: SpinnerOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="p-8 flex flex-col items-center gap-4 min-w-[200px]">
        <div className="relative">
          <Spinner className="w-12 h-12 text-mq-red animate-spin" />
        </div>
      </div>
    </div>
  );
}
