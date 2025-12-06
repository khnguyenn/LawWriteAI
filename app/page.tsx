"use client";

import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import Background from "@/assets/maclaw.jpg";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <NavBar />
      <div className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <Image
          src={Background}
          alt="Background"
          className="w-full h-full object-cover"
          fill
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">
              Rewrite, Compare, and Improve your legal writing with AI.
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/90">
              LawWrite AI is a tool that helps you rewrite, compare, and improve
              your legal writing with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                className="w-full sm:w-auto bg-mq-red text-white font-bold hover:bg-mq-red/90 px-8 py-3 md:px-10 md:py-4 text-base cursor-pointer transition-all duration-200 rounded-xl"
                onClick={() => router.push("/login")}
              >
                Get Started
              </button>
              <button
                className="w-full sm:w-auto bg-charcoal text-white font-bold hover:bg-charcoal/90 px-8 py-3 md:px-10 md:py-4 text-base cursor-pointer transition-all duration-200 rounded-xl"
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
