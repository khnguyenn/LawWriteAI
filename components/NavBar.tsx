"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CircleUserRound, LogOut } from "lucide-react";
import Logo from "@/assets/logo2.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setHasSession(Boolean(user));
      setIsLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setHasSession(Boolean(session?.user));
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

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
                alt="LawWrite AI Logo"
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
          {isLoading ? null : hasSession ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="bg-mq-red text-white font-bold hover:bg-mq-red/90 cursor-pointer w-12 h-12"
                  aria-label="Open account menu"
                >
                  <CircleUserRound className="h-10 w-10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl border border-gray-200 bg-white shadow-xl"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/home"
                    className="w-full cursor-pointer rounded-lg px-2 py-2 text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900"
                  >
                    Scenarios
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg focus:bg-gray-100 focus:text-gray-900"
                  onSelect={async (event) => {
                    event.preventDefault();
                    await supabase.auth.signOut();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
