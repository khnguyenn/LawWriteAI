import { Info, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <h1 className="text-3xl font-semibold text-red-700 mb-2">
        Welcome to Law Write AI !!!
      </h1>
      <p className="text-gray-500 text-md">
        This is a AI Chabot can generate questions based on the context of the
        law document and help you to fully understand the law document.
      </p>

      <div className="bg-white w-1/2 mx-auto rounded-xl shadow-md p-4 text-center mt-10 ">
        <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg mb-2">No questions yet!</p>
        <p className="text-gray-500">
          Submit your rewrite on the Home page to get personalized questions.
        </p>

        <div className="mt-6 p-2 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/20 dark:to-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
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
    </div>
  );
}
