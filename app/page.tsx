"use client";

import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import Background from "@/assets/maclaw.jpg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/AboutSection";
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <NavBar />
      <div className="relative w-full h-[calc(100vh-80px)]">
        <Image
          src={Background}
          alt="Background"
          className="w-full h-full object-cover"
          fill
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

        <div className="absolute inset-0 mt-45 flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Rewrite, Compare, and Improve your legal writing with AI.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-white">
            LawWrite AI is a tool that helps you rewrite, compare, and improve
            your legal writing with AI.
          </p>
          <div className="flex flex-row items-center text-center max-w-3xl mx-auto gap-4">
            <Button
              variant="default"
              className="bg-mq-red text-white font-bold hover:bg-mq-red/90 px-10 py-6 text-base cursor-pointer transition-all duration-200"
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
            <Button
              variant="default"
              className="bg-charcoal text-white font-bold hover:bg-charcoal/90 px-10 py-6 text-base cursor-pointer transition-all duration-200"
            >
              About Us
            </Button>
          </div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}
