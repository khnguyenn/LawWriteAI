"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export function BlockedOverlay() {
  const router = useRouter();

  return (
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
  );
}
