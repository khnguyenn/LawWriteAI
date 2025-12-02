"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

type Profile = {
  studentName: string | null;
  studentMacID: number | null;
};

export function DropDownSlideBar() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      // Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("user: ", user, "userError: ", userError);

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

      console.log("profile data", data, error);

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

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("signOut error:", error);

    // Even if there's no active session (e.g. already signed out),
    // force local state reset and navigate to the landing page so
    // the user always sees a sign-out effect.
    setProfile(null);
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-3 hover:bg-gray-50"
        >
          <User2 className="w-5 h-5 shrink-0" />
          <div className="flex flex-col items-start flex-1 min-w-0 ml-3">
            <span className="text-sm font-medium text-gray-900 truncate w-full text-left">
              {profile?.studentName}
            </span>
            <span className="text-xs text-gray-500 truncate w-full text-left">
              Student ID: {profile?.studentMacID}
            </span>
          </div>
          <ChevronUp className="ml-auto shrink-0 w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="end"
        className="
                w-48
                rounded-xl
                border border-gray-200
                bg-white
                shadow-md
                outline-none
                focus-visible:outline-none
                focus-visible:ring-0
            "
      >
        <DropdownMenuItem className="w-full cursor-pointer">
          <span className="text-bold">Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="w-full cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
