import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Highlighter,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const update = () => forceUpdate((n) => n + 1);

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md py-1 mb-1 bg-slate-50 space-x-2 px-2 flex">
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <Bold className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <Italic className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <Underline className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <AlignLeft className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <AlignCenter className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <AlignRight className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <List className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <ListOrdered className="size-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        className="data-[state=on]:!bg-mq-red data-[state=on]:!text-white"
      >
        <Highlighter className="size-4" />
      </Toggle>
    </div>
  );
}
