"use client";

import { Sidebar } from "@/components/SideBar";
import { SidebarProvider, useSidebar } from "@/components/SidebarContext";

function HomeLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Floating menu button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-6 z-50 p-3 bg-mq-red text-white rounded-xl shadow-2xl hover:bg-deep-red transition-all duration-200 hover:scale-105"
          aria-label="Open sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <main
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <HomeLayoutContent>{children}</HomeLayoutContent>
    </SidebarProvider>
  );
}
