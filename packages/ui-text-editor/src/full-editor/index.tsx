'use client';

import type { EditorEvents } from '@tiptap/react';
import { useEffect } from 'react';
import '../styles.css';
import { Extension } from '@tiptap/core';
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Emoji from '@tiptap/extension-emoji';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import { OrderedList } from '@tiptap/extension-list';
import ListItem from '@tiptap/extension-list-item';
import MathExtention from '@tiptap/extension-mathematics';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import {
  BackgroundColor,
  FontSize,
  LineHeight,
  TextStyle,
} from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { MenuBar } from './components';

export type IndentOptions = {
  types: string[];
  min: number;
  max: number;
};

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Commands<ReturnType> {
    indent: {
      /**
       * Decrease the indentation
       */
      indent: (bc?: boolean) => ReturnType;
      /**
       * Increase the indentation
       */
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create({
  name: 'indent',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'], // loại node muốn hỗ trợ
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const margin = element.style.marginLeft;
              return margin ? parseInt(margin, 10) / 24 : 0; // mỗi indent = 24px
            },
            renderHTML: (attributes) => {
              if (!attributes.indent || attributes.indent === 0) {
                return {};
              }
              return {
                style: `margin-left: ${attributes.indent * 24}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ state, chain }) => {
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node) => {
            if (['paragraph', 'heading'].includes(node.type.name)) {
              const indent = (node.attrs.indent || 0) + 1;
              chain().updateAttributes(node.type.name, { indent }).run();
            }
          });
          return true;
        },
      outdent:
        () =>
        ({ state, chain }) => {
          const { from, to } = state.selection;
          state.doc.nodesBetween(from, to, (node) => {
            if (['paragraph', 'heading'].includes(node.type.name)) {
              const indent = Math.max((node.attrs.indent || 0) - 1, 0);
              chain().updateAttributes(node.type.name, { indent }).run();
            }
          });
          return true;
        },
    };
  },
});

export const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      type: {
        default: '1',
        parseHTML: (element) => element.getAttribute('type'),
        renderHTML: (attributes) => {
          if (!attributes.type) {
            return {};
          }
          return { type: attributes.type };
        },
      },
    };
  },
});

type Props = {
  content?: string;
  onUpdate?: (props: EditorEvents['update']) => void;
  className?: string;
  autoFocus?: boolean;
};

export const FullEditor: React.FC<Props> = ({
  content,
  onUpdate,
  className,
  autoFocus = true,
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Indent,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      FontSize,
      BackgroundColor,
      Emoji,
      CustomOrderedList,
      LineHeight,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      Placeholder.configure({
        placeholder: 'Type something...',
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
        codeBlock: false, // We'll use our own code block extension
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-gray-300',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 bg-gray-100 font-bold',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded-lg font-mono text-sm',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'border-t border-gray-300 my-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Subscript,
      Superscript,
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-200',
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'list-none p-0',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
      MathExtention.configure({
        blockOptions: {
          onClick: (node: any, pos: any) => {
            const newCalculation = prompt(
              'Enter new calculation:',
              node.attrs.latex,
            );
            if (newCalculation) {
              editor
                ?.chain()
                .setNodeSelection(pos)
                .updateBlockMath({ latex: newCalculation })
                .focus()
                .run();
            }
          },
        },
        inlineOptions: {
          onClick: (node: any) => {
            const newCalculation = prompt(
              'Enter new calculation:',
              node.attrs.latex,
            );
            if (newCalculation) {
              editor
                ?.chain()
                .setNodeSelection(node?.pos)
                .updateInlineMath({ latex: newCalculation })
                .focus()
                .run();
            }
          },
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'outline-none min-h-36',
      },
    },
    autofocus: autoFocus,
    onUpdate,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border', className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="w-full flex-1 break-all p-4" />
    </div>
  );
};
