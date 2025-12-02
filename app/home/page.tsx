"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { diffWords } from "diff";
import { ContextArea } from "@/components/ContextArea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import logoImage from "@/assets/image.png";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SAMPLE =
  "This unit is an introductory computer science unit, providing a practical introduction to basic computing and programming concepts. Students gain an understanding of, and practical experience in, computer programming; practical experience in implementing informal prose descriptions of problem solutions using an high-level language; an understanding of, and practical experience in, designing, coding, testing and debugging simple algorithms; and an understanding of the principle of incremental development. Other topics include the concept of program correctness; the differences between high-level languages, assembly languages and machine languages; the role played by compilers; and the execution of programs by computer hardware.";

export default function Home() {
  const router = useRouter();
  const [userText, setUserText] = useState("");
  const [showDiff, setShowDiff] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const diffParts = useMemo(() => diffWords(SAMPLE, userText), [userText]);

  const leftSegments = useMemo(
    () =>
      diffParts.map((part, i) => {
        if (part.added) return null;
        if (part.removed) {
          return (
            <span key={i} className="bg-red-200 text-red-800 px-1 rounded">
              {part.value}
            </span>
          );
        }
        return <span key={i}>{part.value}</span>;
      }),
    [diffParts]
  );

  const rightSegments = useMemo(
    () =>
      diffParts.map((part, i) => {
        if (part.removed) return null;
        if (part.added) {
          return (
            <span key={i} className="bg-green-200 text-green-800 px-1 rounded">
              {part.value}
            </span>
          );
        }
        return <span key={i}>{part.value}</span>;
      }),
    [diffParts]
  );

  const removalCount = useMemo(
    () =>
      diffParts.reduce((sum, part) => {
        if (!part.removed) return sum;
        const words = part.value.trim().split(/\s+/).filter(Boolean);
        return sum + words.length;
      }, 0),
    [diffParts]
  );

  const additionCount = useMemo(
    () =>
      diffParts.reduce((sum, part) => {
        if (!part.added) return sum;
        const words = part.value.trim().split(/\s+/).filter(Boolean);
        return sum + words.length;
      }, 0),
    [diffParts]
  );

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Context Area Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            Editing Your Law Letter to Client
          </h1>
          <Image
            src={logoImage}
            alt="logo"
            width={157}
            height={40}
            className="w-30 h-30"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <ContextArea
            mode="sample"
            title="Sample Text"
            sampleText={SAMPLE}
            disableSelection
          />
          <ContextArea
            mode="typing"
            title="Your Text"
            value={userText}
            onChange={setUserText}
          />
        </div>
      </div>

      {/* Difference Section – only show when showDiff = true */}
      {showDiff && (
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Difference view
          </h2>

          <div className="grid grid-cols-2 gap-4 bg-white border border-gray-200 rounded-lg p-4">
            {/* LEFT – removals */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
                <span className="font-semibold text-red-600">
                  −{removalCount} removal{removalCount !== 1 ? "s" : ""}
                </span>
                <span>1 line</span>
              </div>
              <div className="bg-red-50 rounded-md px-3 py-2 text-sm font-mono text-gray-900">
                <span className="mr-3 text-gray-400">{removalCount}</span>
                {leftSegments}
              </div>
            </div>

            {/* RIGHT – additions */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
                <span className="font-semibold text-green-600">
                  + {additionCount} addition{additionCount !== 1 ? "s" : ""}
                </span>
                <span>1 line</span>
              </div>
              <div className="bg-green-50 rounded-md px-3 py-2 text-sm font-mono text-gray-900">
                <span className="mr-3 text-gray-400">{additionCount}</span>
                {rightSegments}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button Section */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-6 flex-wrap">
          <AlertDialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              // Prevent closing if submission is in progress
              if (!open && userSubmitted) return;
              setIsDialogOpen(open);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-bright-red hover:text-white hover:border-bright-red hover:shadow-lg active:scale-95 transition-all duration-200">
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to submit?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will not be able to change your answer after submitting.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={userSubmitted}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  className="text-base font-semibold rounded-lg border-2 border-gray-300 bg-bright-red text-white hover:bg-bright-red hover:text-white hover:border-bright-red hover:shadow-lg active:scale-95 transition-all duration-200"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (userSubmitted) return;
                    setUserSubmitted(true);
                    // Wait for 2 seconds before navigating (dialog stays open during this time)
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    router.push("/home/chatbot");
                  }}
                  disabled={userSubmitted}
                >
                  {userSubmitted ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      <span className="ml-2">Please wait</span>
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            onClick={() => {
              setUserText("");
              setShowDiff(false); // hide diff on reset
            }}
            className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-charcoal hover:text-white hover:border-charcoal hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            Reset
          </Button>

          {/* Show Diff Button */}
          <Button
            onClick={() => setShowDiff(true)}
            className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-purple hover:text-white hover:border-purple hover:shadow-lg active:scale-95 transition-all duration-200"
          >
            Log (Show Diff)
          </Button>

          <Button className="px-10 py-6 text-base font-semibold rounded-lg border-2 border-gray-300 bg-white text-gray-800 hover:bg-deep-red hover:text-white hover:border-deep-red hover:shadow-lg active:scale-95 transition-all duration-200">
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
}
