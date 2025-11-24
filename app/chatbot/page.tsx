"use client";

import { Info, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ChatbotPage() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  //   useEffect(() => {
  //     const fetchQuestions = async () => {
  //       setLoading(true);
  //       try {
  //         // Call API to get questions (LATER)
  //         // Example response:
  //         const newQuestions = [
  //           "What is the main purpose of the law?",
  //           "What are the potential risks of the law?",
  //           "What are the benefits of the law?",
  //           "What are the alternatives to the law?",
  //         ];
  //         setQuestions(newQuestions);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchQuestions();
  //   }, []);

  const newQuestions = [
    "What is the main purpose of the law?",
    "What are the potential risks of the law?",
    "What are the benefits of the law?",
    "What are the alternatives to the law?",
  ];

  return (
    <div className="flex flex-col items-center text-center mt-20">
      <h1 className="text-3xl font-semibold text-red-700 mb-2">
        Welcome to Law Write AI !!!
      </h1>
      <p className="text-gray-500 text-md">
        This is a AI Chabot can generate questions based on the context of the
        law document and help you to fully understand the law document.
      </p>

      {loading ? (
        <div className="mt-6 flex items-center justify-center">
          <Spinner className="w-8 h-8" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : questions.length > 0 ? (
        <div className="space-y-1 mt-6 w-1/2 mx-auto">
          {questions.map((question, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 transform transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mt-3">
                <div className="flex-shrink-0 w-8 h-8 bg-deep-red text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800 mb-3">{question}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white w-1/2 mx-auto rounded-xl shadow-md p-4 text-center mt-10">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-2">No questions yet!</p>
          <p className="text-gray-500">
            Submit your rewrite on the Home page to get personalized questions.
          </p>

          <Button
            className="mt-6 bg-deep-red text-white hover:bg-deep-red/95 active:scale-95 transition-all duration-200"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setQuestions(newQuestions);
                setLoading(false);
              }, 1000);
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="w-4 h-4" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Generate Questions"
            )}
          </Button>
        </div>
      )}

      <div className="mt-6 w-1/2 mx-auto p-2 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/20 dark:to-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Info className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-left">
              Important Note
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please set up your Zoom and ready to record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
