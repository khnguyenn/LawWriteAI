"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent } from "@tiptap/react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { WholeWord } from "lucide-react";
import { useState, useEffect } from "react";

interface RichTextEditorProps {
  title?: string;
  content?: string;
  onChange?: (content: string) => void;
  onTextChange?: (plainText: string) => void;
  editable?: boolean;
  disablePaste?: boolean;
  showWordCount?: boolean;
}

export default function RichTextEditor({
  title,
  content = "",
  onChange,
  onTextChange,
  editable = true,
  disablePaste = false,
  showWordCount = false,
}: RichTextEditorProps) {
  const [wordCount, setWordCount] = useState(0);

  const updateWordCount = (text: string) => {
    const trimmed = text.trim();
    setWordCount(trimmed === "" ? 0 : trimmed.split(/\s+/).length);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      onTextChange?.(editor.getText());
      updateWordCount(editor.getText());
    },
    editorProps: {
      attributes: {
        class: `py-2 px-3 border rounded-md min-h-[1000px] focus:outline-none ${
          editable ? "bg-white" : "bg-slate-50"
        }`,
      },
      handlePaste: disablePaste ? () => true : undefined,
      handleDrop: disablePaste ? () => true : undefined,
    },
  });

  // Update word count when editor is ready (for initial content)
  useEffect(() => {
    if (editor) {
      updateWordCount(editor.getText());
    }
  }, [editor]);

  return (
    <div className="flex flex-col h-full">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      )}
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="flex-1" />

      {showWordCount && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between rounded-2xl px-5 py-3 border border-red-100 bg-[#FFF5F5] shadow-sm">
            <div className="flex items-center gap-2">
              <WholeWord className="w-5 h-5 text-mq-red" />
              <span className="text-sm font-medium text-mq-red">
                Word Count
              </span>
            </div>
            <span className="text-md font-bold text-red-700">{wordCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
