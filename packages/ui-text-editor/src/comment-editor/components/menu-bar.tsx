import type { Editor } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from 'lucide-react';
import { Toggle } from '@workspace/ui/components/toggle';

type Props = {
  editor: Editor | null;
};

export const MenuBar: React.FC<Props> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        pressed={editor.isActive('bold')}
      >
        <BoldIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}
      >
        <ItalicIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}
      >
        <StrikethroughIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        pressed={editor.isActive('code')}
      >
        <CodeIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
      >
        <ListIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
      >
        <ListOrderedIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive('blockquote')}
      >
        <QuoteIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoIcon />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoIcon />
      </Toggle>
    </div>
  );
};
