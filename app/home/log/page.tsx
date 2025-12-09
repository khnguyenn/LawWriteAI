"use client";
import { useState } from "react";
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
} from "lucide-react";

// Mock data - replace with real data from Supabase
const mockSavedProgress = [
  {
    id: 1,
    savedAt: "2025-12-07T14:30:00",
    rewrittenText: `Private & Confidential
Ms Jessica Martinez
[Address]
Dear Ms Martinez,
Re: Preliminary Advice Regarding Conduct of Thompson & Co
You have asked us to assess your options in the matter of your representation by Thompson and Co. in your family law settlement.
Based on the information provided, we identified several potential breaches of professional obligations under the Legal Profession Uniform Law (NSW) (‘LPUL’),1 and the Legal Profession Uniform Law Australian Solicitors’ Conduct Rules (‘Conduct Rules’),2 which may give rise to regulatory complaints and civil claims.
`,
    wordCount: 120,
  },
];

type SavedProgress = (typeof mockSavedProgress)[0];

export default function LogPage() {
  const [savedVersions] = useState<SavedProgress[]>(mockSavedProgress);
  const [selectedVersion, setSelectedVersion] = useState<SavedProgress | null>(
    null
  );

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
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-4xl font-bold text-charcoal">Your Draft</h1>
              <p className="text-charcoal/60 mt-1 text-lg">
                Review and continue from your saved drafts
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cards */}
          <div className="lg:col-span-2">
            {savedVersions.length === 0 ? (
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
                    className={`group bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:translate-x-2 ${
                      selectedVersion?.id === version.id
                        ? "border-mq-red shadow-xl ring-4 ring-mq-red/10"
                        : "border-gray-100 hover:border-mq-red/40"
                    }`}
                  >
                    {/* Header with badges */}
                    <div className="flex items-center gap-4 mb-4">
                      {index === 0 ? (
                        <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Latest
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-charcoal/5 text-charcoal/60 text-xs font-semibold rounded-full">
                          Version {savedVersions.length - index}
                        </span>
                      )}
                      <div className="flex items-center gap-2 text-charcoal/50">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {version.wordCount} words
                        </span>
                      </div>
                      <div className="h-4 w-px bg-gray-200"></div>
                      <div className="flex items-center gap-2 text-charcoal/40">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(version.savedAt)}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <ArrowRight className="w-5 h-5 text-mq-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Preview text */}
                    <div>
                      <p className="text-base text-charcoal/80 line-clamp-2 leading-relaxed">
                        {version.rewrittenText}
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
              {/* Total Drafts */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Bookmark className="w-8 h-8 text-mq-red" />
                  <span className="text-4xl font-bold text-charcoal">
                    {savedVersions.length}
                  </span>
                </div>
                <p className="text-charcoal/60 text-sm font-medium">
                  Total Drafts
                </p>
              </div>

              {/* Latest Word Count */}
              <div className="bg-gradient-to-br from-mq-red/5 to-deep-red/10 rounded-2xl p-6 border-2 border-mq-red/20 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="w-8 h-8 text-mq-red" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-mq-red to-deep-red bg-clip-text text-transparent">
                    {savedVersions[0]?.wordCount}
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
                  {formatDate(savedVersions[0]?.savedAt)}
                </p>
              </div>

              {/* Total Words Written */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-4xl font-bold text-green-600">
                    {savedVersions.reduce((sum, v) => sum + v.wordCount, 0)}
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
              <div className="flex items-center justify-between p-8 bg-gradient-to-r from-mq-red/5 to-deep-red/5 border-b border-mq-red/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-mq-red to-deep-red rounded-xl shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-2xl">
                      Saved Draft
                    </h3>
                    <p className="text-sm text-charcoal/50 mt-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDate(selectedVersion.savedAt)}
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
                <div className="bg-gradient-to-br from-gray-50 to-sand/20 rounded-2xl p-6 text-base text-charcoal/90 whitespace-pre-line leading-relaxed border border-gray-100 shadow-inner">
                  {selectedVersion.rewrittenText}
                </div>

                {/* Meta Info */}
                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-charcoal/60">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">
                      {selectedVersion.wordCount} words
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-mq-red to-deep-red text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2.5 group">
                  <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Continue Editing
                </button>
                <button className="flex-1 bg-charcoal text-white font-bold py-4 px-6 rounded-xl hover:bg-charcoal/90 hover:shadow-xl hover:scale-105 transition-all text-base flex items-center justify-center gap-2.5 group">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  View Comparison
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
