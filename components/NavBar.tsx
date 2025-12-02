"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo2.png";
import { Button } from "./ui/button";
import Background from "@/assets/maclaw.jpg";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  return (
    <header className="bg-white shadow sticky top-0 z-50 h-20">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">LawWrite AI</span>
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="CarbonCue Logo"
                className="h-20 w-20 object-cover"
              />
              <span className="text-xl font-bold text-mq-red">LawWriteAI</span>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-center gap-x-20">
            <Link
              href="/"
              className="-m-1.5 p-1.5 font-semibold hover:text-mq-red"
            >
              Home
            </Link>
            <Link
              href="/"
              className="-m-1.5 p-1.5 font-semibold hover:text-mq-red"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="-m-1.5 p-1.5 font-semibold hover:text-mq-red"
            >
              Term of Service & Privacy Policy
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="default"
            className="h-full bg-mq-red text-white font-bold hover:bg-mq-red/90 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
          <Button
            variant="default"
            className="h-full bg-charcoal text-white font-bold hover:bg-charcoal/90 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
