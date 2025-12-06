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
import { supabase } from "@/utils/supabase";
import { usePathname } from "next/navigation";

type Profile = {
  studentName: string | null;
  studentMacID: number | null;
};

export default function ChatbotPage() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function loadProfile() {
      // Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      // Get profile for this user
      const { data, error } = await supabase
        .from("student")
        .select("studentName, studentMacID")
        .eq("id", user.id) // same as auth.users.id
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

  const newQuestions = [
    "What is the main purpose of the law?",
    "What are the potential risks of the law?",
    "What are the benefits of the law?",
    "What are the alternatives to the law?",
  ];

  return (
    <div className="max-w-7xl flex flex-col items-center text-center mt-20 mx-auto p-8">
      <h1 className="text-3xl font-semibold text-mq-red mb-2">
        Welcome to LawWriteAI, {profile?.studentName}
      </h1>
      <p className="text-gray-500 text-md font-bold">
        StudentID: {profile?.studentMacID}
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
            className="mt-6 bg-mq-red text-white hover:bg-mq-red/95 active:scale-95 transition-all duration-200"
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

      <div className="mt-6 w-1/2 mx-auto p-2 bg-blue-50 0 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Info className="h-8 w-8 text-blue-600 flex shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1 text-left">
              Important Note
            </h4>
            <p className="text-sm text-blue-700">
              Please set up your Zoom and ready to record.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
