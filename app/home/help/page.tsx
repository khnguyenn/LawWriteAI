"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How do I start rewriting a letter?",
    answer:
      "Navigate to the main editor from the sidebar. You'll see the original letter on one side. Start typing your rewritten version in the editor area",
  },
];

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of using LawWrite AI",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    steps: [
      "Log in with your Macquarie student account",
      "Select 'Start Writing' from the sidebar",
      "Read the original letter carefully",
      "Begin typing your rewritten version",
    ],
  },
  {
    title: "Writing Tips",
    description: "Improve your legal writing skills",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
        />
      </svg>
    ),
    steps: [
      "Use clear and precise language",
      "Maintain formal tone throughout",
      "Structure paragraphs logically",
      "Avoid unnecessary repetition",
    ],
  },
  {
    title: "Using Comparisons",
    description: "Make the most of the diff view",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
    steps: [
      "Complete your rewrite first",
      "Click 'Compare' to see differences",
      "Green highlights show additions",
      "Red highlights show removals",
    ],
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen mt-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-charcoal">Help Center</h1>
          <p className="text-charcoal/60 mt-2">
            Everything you need to know about using LawWrite AI
          </p>
        </div>

        {/* Quick Guides */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Quick Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {guides.map((guide, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedGuide(selectedGuide === index ? null : index)
                }
                className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all ${
                  selectedGuide === index
                    ? "border-mq-red shadow-lg"
                    : "border-gray-100 hover:border-mq-red/30 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    selectedGuide === index
                      ? "bg-mq-red text-white"
                      : "bg-mq-red/10 text-mq-red"
                  }`}
                >
                  {guide.icon}
                </div>
                <h3 className="font-semibold text-charcoal mb-1">
                  {guide.title}
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  {guide.description}
                </p>

                {selectedGuide === index && (
                  <ul className="space-y-2 pt-4 border-t border-gray-100">
                    {guide.steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="flex items-start gap-2 text-sm text-charcoal/70"
                      >
                        <span className="w-5 h-5 rounded-full bg-mq-red/10 text-mq-red text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-charcoal pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-charcoal/40 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 mt-2">
                    <p className="text-sm text-charcoal/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-charcoal to-charcoal/90 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Still need help?
          </h3>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
            Can't find what you're looking for? Our support team is here to
            assist you.
          </p>
          <a
            href="mailto:law@mq.edu.au"
            className="inline-flex items-center gap-2 bg-mq-red text-white font-medium py-3 px-6 rounded-xl hover:bg-mq-red/90 transition-all text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Contact Support
          </a>
        </div>

        {/* Keyboard Shortcuts */}
        {/* <div className="mt-12">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Keyboard Shortcuts
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { keys: ["Ctrl", "S"], action: "Save draft" },
                { keys: ["Ctrl", "Enter"], action: "Submit for comparison" },
                { keys: ["Ctrl", "Z"], action: "Undo" },
                { keys: ["Ctrl", "Shift", "Z"], action: "Redo" },
              ].map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-sm text-charcoal/70">
                    {shortcut.action}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex}>
                        <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono text-charcoal shadow-sm">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="text-charcoal/30 mx-1">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
