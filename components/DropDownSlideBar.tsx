import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { Button } from "./ui/button";

export function DropDownSlideBar() {
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
              Tran Khoi Nguyen Nguyen
            </span>
            <span className="text-xs text-gray-500 truncate w-full text-left">
              Student ID: 48769266
            </span>
          </div>
          <ChevronUp className="ml-auto shrink-0 w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="start"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
        className="min-w-(--radix-dropdown-menu-trigger-width)"
      >
        <DropdownMenuItem className="w-full cursor-pointer">
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full cursor-pointer">
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
