"use client";

import {
  Home,
  MessagesSquare,
  CheckCircle,
  Settings,
  Users,
  HelpCircle,
  Scale,
  Save,
  Menu,
  X,
} from "lucide-react";
import { DropDownSlideBar } from "./DropDownSlideBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import Logo from "@/assets/logo2.png";
import Image from "next/image";
import { useSidebar } from "./SidebarContext";

type Profile = {
  studentName: string | null;
  studentMacID: number | null;
};

export function Sidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, setIsOpen } = useSidebar();

  useEffect(() => {
    async function loadProfile() {
      // Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        return;
      }

      // Get profile for this user
      const { data, error } = await supabase
        .from("student")
        .select("studentName, studentMacID")
        .eq("id", user.id) // same as auth.users.id
        .single();

      if (!error && data) {
        setProfile({
          studentName: data.studentName,
          studentMacID: data.studentMacID,
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  const navItems = [
    { icon: Scale, label: "Scenario", href: "/home" },
    {
      icon: MessagesSquare,
      label: "AI Question Session",
      href: "/home/chatbot",
    },
    { icon: HelpCircle, label: "Help", href: "/home/help" },
    { icon: Save, label: "Your Drafts", href: "/home/log" },
  ];

  return (
    <div
      className={`w-72 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <h1 className="text-mq-red text-2xl font-bold">LawWrite</h1>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ease-in-out font-bold ${
                      isActive
                        ? "bg-mq-red text-white"
                        : "text-gray-700 hover:bg-gray-50 cursor-pointer"
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
