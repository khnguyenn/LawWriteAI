"use client";

import {
  Home,
  MessagesSquare,
  CheckCircle,
  Settings,
  Users,
  HelpCircle,
} from "lucide-react";
import { DropDownSlideBar } from "./DropDownSlideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: MessagesSquare,
      label: "AI ChatBot",
      href: "/chatbot",
    },
    { icon: HelpCircle, label: "Help", href: "/help" },
    { icon: Users, label: "About", href: "/about" },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-red-700 text-2xl font-bold">Law Write AI</h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <DropDownSlideBar />
      </div>
    </div>
  );
}
