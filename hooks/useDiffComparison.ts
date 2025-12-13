"use client";

import { useMemo } from "react";
import { diffWords } from "diff";
import { SAMPLE_TEXT, SAMPLE_HTML } from "@/lib/sample-text";

// Normalize text for comparison - keeps paragraph structure
const normalizeForDiff = (text: string) => {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ") // Collapse spaces/tabs but keep newlines
    .trim();
};

export function useDiffComparison(userText: string, userHtml: string) {
  // Get diff parts using diffWords
  const diffParts = useMemo(() => {
    const normalizedSample = normalizeForDiff(SAMPLE_TEXT);
    const normalizedUser = normalizeForDiff(userText);
    return diffWords(normalizedSample, normalizedUser);
  }, [userText]);

  // Count changed words
  const removalCount = useMemo(
    () =>
      diffParts
        .filter((p) => p.removed)
        .reduce(
          (sum, p) => sum + p.value.trim().split(/\s+/).filter(Boolean).length,
          0
        ),
    [diffParts]
  );

  const additionCount = useMemo(
    () =>
      diffParts
        .filter((p) => p.added)
        .reduce(
          (sum, p) => sum + p.value.trim().split(/\s+/).filter(Boolean).length,
          0
        ),
    [diffParts]
  );

  // Helper to convert text to HTML with proper paragraph structure
  const textToHtml = (
    text: string,
    isHighlight: boolean,
    type: "removed" | "added"
  ) => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (isHighlight) {
      const bgColor = type === "removed" ? "#fecaca" : "#bbf7d0";
      const textColor = type === "removed" ? "#991b1b" : "#166534";

      // Split by newlines, wrap each segment, then rejoin with proper spacing
      return escaped
        .split("\n")
        .map((line) =>
          line.trim()
            ? `<mark style="background-color: ${bgColor}; color: ${textColor}; padding: 1px 3px; border-radius: 3px;">${line}</mark>`
            : ""
        )
        .join("</p><p>");
    }

    // For unchanged text, preserve paragraph breaks
    return escaped.split("\n").join("</p><p>");
  };

  // Build HTML for Sample Letter (left side) - shows removed text in red
  const highlightedOriginalHtml = useMemo(() => {
    if (!userText || userText.trim() === "") return SAMPLE_HTML;

    const html = diffParts
      .map((part) => {
        if (part.added) return "";

        if (part.removed) {
          return textToHtml(part.value, true, "removed");
        }

        return textToHtml(part.value, false, "removed");
      })
      .join("");

    return `<div class="prose prose-sm max-w-none"><p>${html}</p></div>`;
  }, [userText, diffParts]);

  // Build HTML for User's Letter (right side) - shows added text in green
  const highlightedUserHtml = useMemo(() => {
    if (!userHtml) return "";
    if (!userText || userText.trim() === "") return userHtml;

    const html = diffParts
      .map((part) => {
        if (part.removed) return "";

        if (part.added) {
          return textToHtml(part.value, true, "added");
        }

        return textToHtml(part.value, false, "added");
      })
      .join("");

    return `<div class="prose prose-sm max-w-none"><p>${html}</p></div>`;
  }, [userText, userHtml, diffParts]);

  return {
    removalCount,
    additionCount,
    highlightedOriginalHtml,
    highlightedUserHtml,
    diffParts,
  };
}
