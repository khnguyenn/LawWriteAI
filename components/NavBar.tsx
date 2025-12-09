"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import Logo from "@/assets/logo2.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">LawWrite</span>
            <div className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="LawWrite AI Logo"
                className="h-12 w-12 md:h-16 md:w-16 object-cover"
              />
              <span className="text-lg md:text-xl font-bold text-mq-red">
                LawWrite
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-20">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg  font-semibold hover:text-mq-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-2">
          {isLoading ? null : hasSession ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="bg-mq-red text-white font-bold hover:bg-mq-red/90 cursor-pointer w-12 h-12"
                  aria-label="Open account menu"
                >
                  <CircleUserRound className="h-5 w-5" />
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
              <button
                className="bg-mq-red text-white font-bold hover:bg-mq-red/90 cursor-pointer rounded-md px-4 py-2"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <button
                className="bg-charcoal text-white font-bold hover:bg-charcoal/90 cursor-pointer rounded-md px-4 py-2"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100 hover:text-mq-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t space-y-2">
              {isLoading ? null : hasSession ? (
                <>
                  <Link
                    href="/home"
                    className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Scenarios
                  </Link>
                  <button
                    className="w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-100"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="inline-block mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    className="w-full bg-mq-red text-white font-bold hover:bg-mq-red/90 cursor-pointer rounded-md px-4 py-2"
                    onClick={() => {
                      router.push("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="w-full bg-charcoal text-white font-bold hover:bg-charcoal/90 cursor-pointer rounded-md px-4 py-2"
                    onClick={() => {
                      router.push("/signup");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
