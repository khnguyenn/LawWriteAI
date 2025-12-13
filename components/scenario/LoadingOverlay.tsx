"use client";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-mq-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-charcoal">
          Checking your submission status...
        </p>
      </div>
    </div>
  );
}
