import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SpinnerProvider } from "@/components/SpinnerProvider";
import NavigationSpinner from "@/components/NavigationSpinner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawWrite",
  description:
    "LawWrite is a tool that helps you rewrite, compare, and improve your legal writing with AI.",
  icons: {
    icon: [
      { url: "/logo2.png", type: "image/png", sizes: "32x32" },
      { url: "/logo2.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: [{ url: "/logo2.png", type: "image/png" }],
    apple: [{ url: "/logo2.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}
      >
        <SpinnerProvider>
          <NavigationSpinner />
          {children}
          <Toaster />
        </SpinnerProvider>
      </body>
    </html>
  );
}
