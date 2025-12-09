"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type Profile = {
  studentName: string | null;
  studentMacID: number | null;
};

const instructions = [
  "Set up your Zoom and ensure your camera and microphone are working",
  "Find a quiet place with good lighting for your recording",
  "Have your rewritten letter open for reference",
  "Be prepared to explain your writing choices clearly",
  "You will answer AI-generated questions based on your rewrite",
];

export default function ChatbotPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [checkedInstructions, setCheckedInstructions] = useState<boolean[]>(
    new Array(instructions.length).fill(false)
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const allChecked = checkedInstructions.every((checked) => checked);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("student")
        .select("studentName, studentMacID")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile({
          studentName: data.studentName,
          studentMacID: data.studentMacID,
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  const handleCheckInstruction = (index: number) => {
    const newChecked = [...checkedInstructions];
    newChecked[index] = !newChecked[index];
    setCheckedInstructions(newChecked);
  };

  const handleStartSession = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmStart = () => {
    setShowConfirmModal(false);
    setHasStarted(true);
    setGenerating(true);

    // Simulate generating questions
    setTimeout(() => {
      setQuestions([
        "What is the main purpose of the law?",
        "What are the potential risks of the law?",
        "What are the benefits of the law?",
        "What are the alternatives to the law?",
      ]);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-charcoal">
            AI Question Session
          </h1>
          {profile && !loading && (
            <div className="flex gap-3 mt-3 justify-center">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-mq-red/10 flex items-center justify-center">
                  <span className="text-mq-red font-semibold text-sm">
                    {profile.studentName?.charAt(0) || "S"}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-charcoal">
                    {profile.studentName}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    ID: {profile.studentMacID}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <svg
                  className="w-5 h-5 text-mq-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                <Button
                  variant="link"
                  className="text-sm font-medium text-charcoal"
                >
                  Your Letter
                </Button>
              </div>
            </div>
          )}
          {loading && (
            <div className="mt-3 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Spinner className="w-4 h-4 animate-spin" />
              <p className="text-sm font-medium text-charcoal">Loading...</p>
            </div>
          )}
        </div>

        {!hasStarted ? (
          <>
            {/* Instructions Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-mq-red to-deep-red p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Before You Begin
                    </h2>
                    <p className="text-white/80 text-sm">
                      Please read and check all instructions
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        checkedInstructions[index]
                          ? "bg-green-50 border-2 border-green-200"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={checkedInstructions[index]}
                          onChange={() => handleCheckInstruction(index)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                            checkedInstructions[index]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {checkedInstructions[index] && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                            checkedInstructions[index]
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-charcoal/60"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span
                          className={`text-sm ${
                            checkedInstructions[index]
                              ? "text-green-800"
                              : "text-charcoal/70"
                          }`}
                        >
                          {instruction}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-charcoal/60">
                      Checklist Progress
                    </span>
                    <span className="text-sm font-medium text-charcoal">
                      {checkedInstructions.filter(Boolean).length} /{" "}
                      {instructions.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{
                        width: `${
                          (checkedInstructions.filter(Boolean).length /
                            instructions.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex">
              {!allChecked && (
                <p className="text-center text-sm text-charcoal/50 mt-3">
                  Please check all instructions to continue
                </p>
              )}

              <button
                onClick={handleStartSession}
                disabled={!allChecked}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all flex gap-2 ml-auto ${
                  allChecked
                    ? "bg-mq-red text-white hover:bg-mq-red/90 shadow-md shadow-mq-red/20"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
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
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
                Start Question Session
              </button>
            </div>
          </>
        ) : (
          /* Questions Section */
          <div>
            {generating ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mq-red/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-mq-red animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Generating Your Questions
                </h3>
                <p className="text-charcoal/60 text-sm">
                  Analyzing your rewrite to create personalized questions...
                </p>
              </div>
            ) : (
              <>
                {/* Info Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-amber-800">
                      Recording Reminder
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Make sure Zoom is recording before you start answering the
                      questions.
                    </p>
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-mq-red text-white flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex">
                          <p className="text-charcoal font-medium leading-relaxed mt-1 text-lg">
                            {question}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complete Button */}
                <div className="mt-6 flex justify-center">
                  <button className="px-6 py-3 rounded-xl font-medium text-sm bg-green-600 text-white hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-green-600/20">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    Complete Session
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-amber-50 p-6 border-b border-amber-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900">
                    Are you sure?
                  </h3>
                  <p className="text-sm text-amber-700">
                    Please read carefully before proceeding
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-charcoal/70">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  <span>
                    <strong className="text-charcoal">
                      You cannot go back
                    </strong>{" "}
                    once you start the question session
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-charcoal/70">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  <span>
                    <strong className="text-charcoal">
                      Questions cannot be regenerated
                    </strong>{" "}
                    after this point
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-charcoal/70">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <span>
                    Make sure your{" "}
                    <strong className="text-charcoal">
                      Zoom recording is ready
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-charcoal hover:bg-gray-50 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmStart}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-mq-red text-white hover:bg-mq-red/90 transition-all"
              >
                Yes, Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
