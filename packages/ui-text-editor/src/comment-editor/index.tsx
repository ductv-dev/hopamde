'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { XIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import '../styles.css';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { MenuBar } from './components';

const MAX_CHARACTERS = 1000;

const extensions = [
  Document,
  Paragraph,
  Text,
  CharacterCount.configure({
    limit: MAX_CHARACTERS,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  Placeholder.configure({
    placeholder: 'Chia sẻ cảm nghĩ của bạn …',
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
    },
  }),
];

type User = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  user?: User;
  content?: string;
  onCancel?: () => void;
};

export const CommentEditor: React.FC<Props> = ({ user, content, onCancel }) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'outline-none min-h-36',
      },
    },
    autofocus: true,
  });

  return (
    <div className="w-full rounded-lg border">
      <div className="flex justify-end border-b p-2">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-lg"
          onClick={onCancel}
        >
          <XIcon />
        </Button>
      </div>
      <div className="border-b p-2">
        <div
          className="flex min-h-36 w-full flex-row"
          onClick={() => {
            if (editor && !editor.isFocused) {
              editor.commands.focus('end');
            }
          }}
        >
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="rounded-lg">
              {user?.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <EditorContent
            editor={editor}
            className="w-full flex-1 break-all p-4 pt-0"
          />
        </div>
        <div className="text-end text-xs text-gray-500">
          {editor?.storage.characterCount.characters()} / {MAX_CHARACTERS}{' '}
          characters
        </div>
      </div>
      <div className="flex justify-between p-2">
        <div className="flex gap-1">
          <MenuBar editor={editor} />
        </div>
        <Button className="cursor-pointer rounded-lg">Bình luận</Button>
      </div>
    </div>
  );
};
