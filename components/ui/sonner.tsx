"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const toastSurfaceStyles: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#0f172a",
  border: "1px solid rgba(15,23,42,0.08)",
  boxShadow: "0 20px 45px rgba(15,23,42,0.15)",
  backdropFilter: "none",
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        className:
          "bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-2xl",
        descriptionClassName: "text-gray-600",
        classNames: {
          actionButton:
            "bg-mq-red text-white font-semibold rounded-xl px-4 py-2",
          cancelButton: "text-gray-500 font-medium",
        },
        style: toastSurfaceStyles,
      }}
      {...props}
    />
  );
};

export { Toaster };
