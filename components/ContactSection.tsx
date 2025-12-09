"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="w-full py-20">
      {/* Section Divider */}
      <div className="flex items-center justify-center gap-4 mb-16">
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-mq-red/40"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mq-red/30"></div>
          <div className="w-3 h-3 rotate-45 bg-mq-red"></div>
          <div className="w-2 h-2 rounded-full bg-mq-red/30"></div>
        </div>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-mq-red/40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Bordered container */}
        <div className="relative rounded-3xl border-2 border-mq-red/20 bg-gradient-to-br from-white via-white to-mq-red/5 p-8 md:p-12 overflow-hidden shadow-xl shadow-mq-red/5">
          {/* Decorative corner accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-mq-red/10 rounded-bl-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-mq-red/5 rounded-tr-[60px]"></div>

          <div className="relative grid md:grid-cols-2 gap-12 items-start">
            {/* Left side - Info */}
            <div>
              <p className="text-mq-red font-bold tracking-wide uppercase text-sm mb-3">
                Contact Us
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                Have questions, suggestions, or feedback? We're here to help
                <br /> Reach out to us and we'll get back to you as soon as
                possible.
              </p>

              {/* Contact cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-charcoal/10 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-mq-red/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-mq-red"
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
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Email Us</h4>
                    <a
                      href="mailto:law@mq.edu.au"
                      className="text-sm text-charcoal/60 hover:text-mq-red transition-colors"
                    >
                      LAW EMAIL
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-charcoal/10 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-mq-red/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-mq-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Visit Us</h4>
                    <p className="text-sm text-charcoal/60">
                      Macquarie Law School, Michael Kirby Building 17 Wally’s
                      Walk
                      <br />
                      Wallumattagal Campus
                      <br />
                      Macquarie University, NSW 2109
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-charcoal/10 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-mq-red/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-mq-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal">Response Time</h4>
                    <p className="text-sm text-charcoal/60">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-charcoal/10">
              <h3 className="text-xl font-semibold text-charcoal mb-6">
                Send us a message
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
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
                  </div>
                  <h4 className="text-lg font-semibold text-charcoal mb-2">
                    Thank you!
                  </h4>
                  <p className="text-charcoal/70">
                    Your message has been sent successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal/80 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-mq-red focus:ring-2 focus:ring-mq-red/20 outline-none transition-all text-sm"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal/80 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-mq-red focus:ring-2 focus:ring-mq-red/20 outline-none transition-all text-sm"
                      placeholder="your@students.mq.edu.au"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal/80 mb-1.5"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-mq-red focus:ring-2 focus:ring-mq-red/20 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-mq-red text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-mq-red/90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
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
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
