"use client";
import { useState, useEffect } from "react";
import {
  Bookmark,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  Edit3,
  ArrowRight,
  X,
  Calendar,
  Lock,
  FilePenLine,
} from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { toast } from "sonner";

type SavedProgress = {
  id: number;
  created_at: string;
  letterText: string;
  letterJson: JSONContent;
  studentID: string;
  isFinal: boolean;
};

// Read-only viewer component for formatted text
function RichTextViewer({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
    ],
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}

export default function LogPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedVersions, setSavedVersions] = useState<SavedProgress[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<SavedProgress | null>(
    null
  );

  // Fetch saved progress on component mount
  useEffect(() => {
    getSavedProgress();
  }, []);

  const getCreatedAt = (version: SavedProgress) => {
    return (
      version.created_at ||
      (version as any).created_at ||
      new Date().toISOString()
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSavedProgress = async () => {
    setIsLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to view your saved progress.");
      setIsLoading(false);
      return;
    }

    const { data, error: savedProgressError } = await supabase
      .from("letter")
      .select("*")
      .eq("studentID", user.id)
      .order("created_at", { ascending: false });

    if (savedProgressError) {
      toast.error(`Error: ${savedProgressError.message}`);
      setIsLoading(false);
      return;
    }

    setSavedVersions(data || []);
    setIsLoading(false);
  };

  const calculateWordCount = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-amber-500";
    return "bg-mq-red";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-charcoal">Your Draft</h1>
              <p className="text-charcoal/60 mt-1 text-lg">
                Review and continue from your saved drafts
              </p>
            </div>
            <button
              onClick={getSavedProgress}
              disabled={isLoading}
              className="flex items-center gap-2 bg-deep-red text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Clock className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cards */}
          <div className="lg:col-span-2">
            {isLoading ? (
              /* Loading State */
              <div className="bg-white rounded-3xl border-2 border-gray-200 p-16 text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-mq-red/10 to-deep-red/10 flex items-center justify-center animate-pulse">
                  <Clock className="w-12 h-12 text-mq-red animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  Loading Your Drafts...
                </h3>
                <p className="text-charcoal/50 text-base">
                  Please wait while we fetch your saved progress.
                </p>
              </div>
            ) : savedVersions.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center shadow-sm">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-mq-red/10 to-deep-red/10 flex items-center justify-center">
                  <Bookmark className="w-12 h-12 text-mq-red" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  No Saved Drafts Yet
                </h3>
                <p className="text-charcoal/50 text-base mb-8 max-w-md mx-auto">
                  Start rewriting your legal letter and your progress will be
                  automatically saved here.
                </p>
                <button className="bg-gradient-to-r from-mq-red to-deep-red text-white font-semibold py-3.5 px-8 rounded-xl hover:shadow-lg hover:scale-105 transition-all text-base">
                  Start Writing Now
                </button>
              </div>
            ) : (
              /* Saved Versions List */
              <div className="space-y-4">
                {savedVersions.map((version, index) => (
                  <div
                    key={version.id}
                    onClick={() => setSelectedVersion(version)}
                    className={`group rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:translate-x-2 ${
                      version.isFinal
                        ? "bg-white border-mq-red"
                        : "bg-white border-gray-100"
                    } ${
                      selectedVersion?.id === version.id
                        ? version.isFinal
                          ? "border-mq-red shadow-xl ring-4 ring-mq-red/10"
                          : "border-mq-red shadow-xl ring-4 ring-mq-red/10"
                        : version.isFinal
                        ? "hover:border-mq-red"
                        : "hover:border-mq-red"
                    }`}
                  >
                    {/* Header with badges */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {/* Final/Draft Status Badge */}
                      {version.isFinal ? (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-mq-magenta to-mq-magenta/80 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md">
                          <Lock className="w-3.5 h-3.5" />
                          FINAL SUBMISSION
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-charcoal to-charcoal/80 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                          <FilePenLine className="w-3.5 h-3.5 text-mq-charcoal" />
                          Draft
                        </span>
                      )}

                      {/* Latest Badge */}
                      {index === 0 && (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Latest
                        </span>
                      )}

                      <div className="flex items-center gap-2 text-charcoal/50">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {calculateWordCount(version.letterText)} words
                        </span>
                      </div>
                      <div className="h-4 w-px bg-gray-200"></div>
                      <div className="flex items-center gap-2 text-charcoal/40">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(getCreatedAt(version))}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <ArrowRight className="w-5 h-5 text-mq-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Preview text */}
                    <div>
                      <p className="text-base text-charcoal/80 line-clamp-2 leading-relaxed">
                        {version.letterText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Stats */}
          {savedVersions.length > 0 && (
            <div className="lg:col-span-1 space-y-4">
              {/* Final vs Draft Count */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-mq-magenta" />
                      <span className="text-sm font-medium text-charcoal">
                        Final
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-mq-magenta">
                      {savedVersions.filter((v) => v.isFinal).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FilePenLine className="w-5 h-5 text-charcoal" />
                      <span className="text-sm font-medium text-charcoal">
                        Drafts
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-charcoal">
                      {savedVersions.filter((v) => !v.isFinal).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Latest Word Count */}
              <div className="bg-gradient-to-br from-mq-red/5 to-deep-red/10 rounded-2xl p-6 border-2 border-mq-red/20 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="w-8 h-8 text-mq-red" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-mq-red to-deep-red bg-clip-text text-transparent">
                    {savedVersions[0]
                      ? calculateWordCount(savedVersions[0].letterText)
                      : 0}
                  </span>
                </div>
                <p className="text-charcoal/70 text-sm font-medium">
                  Latest Word Count
                </p>
              </div>

              {/* Last Updated */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-8 h-8 text-charcoal/60" />
                </div>
                <p className="text-charcoal/60 text-sm font-medium mb-1">
                  Last Updated
                </p>
                <p className="text-charcoal font-semibold text-base">
                  {savedVersions[0]
                    ? formatDate(getCreatedAt(savedVersions[0]))
                    : "N/A"}
                </p>
              </div>

              {/* Total Words Written */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-4xl font-bold text-green-600">
                    {savedVersions.reduce(
                      (sum, v) => sum + calculateWordCount(v.letterText),
                      0
                    )}
                  </span>
                </div>
                <p className="text-green-700 text-sm font-medium">
                  Total Words Modified
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Version Detail Modal/Panel */}
        {selectedVersion && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div
                className={`flex items-center justify-between p-8 border-b ${
                  selectedVersion.isFinal
                    ? "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200"
                    : "bg-gradient-to-r from-mq-red/5 to-deep-red/5 border-mq-red/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl shadow-lg ${
                      selectedVersion.isFinal
                        ? "bg-gradient-to-br from-mq-magenta to-mq-magenta/80"
                        : "bg-gradient-to-br from-mq-red to-deep-red"
                    }`}
                  >
                    {selectedVersion.isFinal ? (
                      <Lock className="w-6 h-6 text-white" />
                    ) : (
                      <FileText className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-charcoal text-2xl">
                        {selectedVersion.isFinal
                          ? "Final Submission"
                          : "Saved Draft"}
                      </h3>
                      {selectedVersion.isFinal && (
                        <span className="px-2 py-1 bg-mq-magenta text-white text-xs font-bold rounded-md">
                          LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/50 mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDate(getCreatedAt(selectedVersion))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedVersion(null)}
                    className="p-2.5 rounded-xl hover:bg-white/50 transition-all"
                  >
                    <X className="w-6 h-6 text-charcoal/60" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto max-h-[50vh]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-mq-red to-deep-red rounded-full"></div>
                  <p className="text-xs font-bold text-charcoal/60 uppercase tracking-wider">
                    Your Rewrite
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-sand/20 rounded-2xl p-6 border border-gray-100 shadow-inner">
                  <RichTextViewer content={selectedVersion.letterJson} />
                </div>

                {/* Meta Info */}
                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-charcoal/60">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">
                      {calculateWordCount(selectedVersion.letterText)} words
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                {selectedVersion.isFinal ? (
                  <>
                    <div className="flex-1 bg-gray-200 text-gray-500 font-bold py-4 px-6 rounded-xl text-base flex items-center justify-center gap-2.5 cursor-not-allowed">
                      <Lock className="w-5 h-5" />
                      Editing Locked
                    </div>
                    <button className="flex-1 bg-mq-magenta text-white font-bold py-4 px-6 rounded-xl hover:bg-mq-magenta/90 hover:shadow-xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2.5 group">
                      <FileText className="w-5 h-5" />
                      View Final Version
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 bg-gradient-to-r from-mq-red to-deep-red text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2.5 group">
                      <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Continue Editing
                    </button>
                    <button className="flex-1 bg-charcoal text-white font-bold py-4 px-6 rounded-xl hover:bg-charcoal/90 hover:shadow-xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2.5 group">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      View Comparison
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
