export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Built to Improve Your Legal Writing
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            LawWriteAI guides you from first draft to polished submission with
            tools that make practice real, not passive.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Rewrite & Improve */}
          <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-2xl">
              ✍️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Rewrite &amp; Improve
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Enhance your writing with AI-powered suggestions tailored to
                legal arguments, structure, and clarity.
              </p>
            </div>
          </div>

          {/* Track Differences */}
          <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
              🔍
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Track Differences
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                See exactly what changed between your original and revised
                drafts with a side-by-side diff viewer.
              </p>
            </div>
          </div>

          {/* No Copy-Paste Allowed */}
          <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              ❌
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                No Copy-Paste Allowed
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Students must type and rewrite in their own words, encouraging
                genuine learning instead of shortcutting.
              </p>
            </div>
          </div>

          {/* AI Feedback Questions */}
          <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                AI Feedback Questions
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Generate targeted reflection questions from your changes to help
                you explain your reasoning in video or class.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
