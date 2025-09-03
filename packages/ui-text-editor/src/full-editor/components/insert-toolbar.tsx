import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import {
  ChevronDownIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  SquareIcon,
  TableIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { ButtonLink } from './button-link';
import { ButtonUploadImage } from './button-upload-image';
import { ButtonWithTooltip } from './button-with-tooltip';

const insertItems = [
  {
    name: 'Basic blocks',
    key: 'basic_block',
    items: [
      {
        icon: <PilcrowIcon className="size-4" />,
        keywords: ['paragraph'],
        label: 'Text',
        value: 'paragraph',
      },
      {
        icon: <Heading1Icon className="size-4" />,
        keywords: ['title', 'h1'],
        label: 'Heading 1',
        value: 'h1',
      },
      {
        icon: <Heading2Icon className="size-4" />,
        keywords: ['subtitle', 'h2'],
        label: 'Heading 2',
        value: 'h2',
      },
      {
        icon: <Heading3Icon className="size-4" />,
        keywords: ['subtitle', 'h3'],
        label: 'Heading 3',
        value: 'h3',
      },
      {
        icon: <TableIcon className="size-4" />,
        keywords: ['table'],
        label: 'Table',
        value: 'table',
      },
      {
        icon: <FileCodeIcon className="size-4" />,
        keywords: ['```'],
        label: 'Code',
        value: 'codeBlock',
      },
      {
        icon: <QuoteIcon className="size-4" />,
        keywords: ['citation', 'blockquote', '>'],
        label: 'Quote',
        value: 'blockquote',
      },
      {
        icon: <MinusIcon className="size-4" />,
        keywords: ['divider'],
        label: 'Divider',
        value: 'divider',
      },
    ],
  },
  {
    name: 'Lists',
    key: 'list',
    items: [
      {
        icon: <ListIcon className="size-4" />,
        keywords: ['unordered', 'ul', '-'],
        label: 'Bulleted list',
        value: 'ul',
      },
      {
        icon: <ListOrderedIcon className="size-4" />,
        keywords: ['ordered', 'ol', '1'],
        label: 'Numbered list',
        value: 'ol',
      },
      {
        icon: <SquareIcon className="size-4" />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'To-do list',
        value: 'todo',
      },
    ],
  },
  {
    name: 'Media',
    key: 'media',
    items: [
      {
        icon: <ImageIcon className="size-4" />,
        keywords: ['image'],
        label: 'Image',
        value: 'image',
      },
    ],
  },
  {
    name: 'Advanced blocks',
    key: 'advanced',
    items: [
      {
        icon: <Columns3Icon className="size-4" />,
        label: '3 columns',
        value: 'action_three_columns',
      },
      {
        icon: <RadicalIcon className="size-4" />,
        label: 'Equation',
        value: 'equation',
      },
    ],
  },
  {
    name: 'Inline',
    key: 'inline',
    items: [
      {
        icon: <LinkIcon className="size-4" />,
        label: 'Link',
        value: 'link',
      },
    ],
  },
];

type Props = {
  editor: Editor;
};

export const InsertToolbar: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const outBlock = () => {
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    let parentNode = null;
    let parentPos = null;

    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if (
        node.type.name === 'table' ||
        node.type.name === 'codeBlock' ||
        node.type.name === 'blockquote'
      ) {
        parentNode = node;
        parentPos = $from.before(i);
        break;
      }
    }

    if (parentNode && parentPos !== null) {
      const insertPos = parentPos + parentNode.nodeSize;
      editor
        .chain()
        .focus()
        .setTextSelection(insertPos + 1)
        .run();
    } else {
      editor.commands.selectTextblockEnd();
    }
  };

  const handleSelect = (itemValue: string) => {
    outBlock();
    if (itemValue === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    }
    if (itemValue === 'h1' || itemValue === 'h2' || itemValue === 'h3') {
      editor
        .chain()
        .focus()
        .setHeading({ level: Number(itemValue.slice(1)) as Level })
        .run();
    }
    if (itemValue === 'table') {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
        .run();
    }
    if (itemValue === 'codeBlock') {
      editor.chain().focus().setCodeBlock().run();
    }

    if (itemValue === 'blockquote') {
      editor.chain().focus().setBlockquote().run();
    }
    if (itemValue === 'divider') {
      editor.chain().focus().setHorizontalRule().run();
    }

    if (itemValue === 'ul') {
      editor.chain().focus().setNode('listItem').wrapIn('bulletList').run();
    }

    if (itemValue === 'ol') {
      editor.chain().focus().setNode('listItem').wrapIn('orderedList').run();
    }

    if (itemValue === 'todo') {
      editor.chain().focus().setNode('listItem').wrapIn('taskList').run();
    }

    if (itemValue === 'action_three_columns') {
      editor
        .chain()
        .focus()
        .insertTable({ cols: 3, withHeaderRow: true })
        .run();
    }

    if (itemValue === 'equation') {
      const hasSelection = !editor.state.selection.empty;

      if (hasSelection) {
        return (editor as any).chain()?.setInlineMath().focus().run();
      }

      const latex = prompt('Enter inline math expression:', '') || '';
      (editor as any).chain().insertInlineMath({ latex }).focus().run();
    }

    editor.commands.focus();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={
              <div className="flex w-full items-center gap-1">
                <PlusIcon className="size-4" />
                <ChevronDownIcon className="size-4" />
              </div>
            }
            tooltipContent="Insert"
            pressed={open}
            className=""
          />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-fit min-w-40"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.commands.focus();
        }}
        align="start"
      >
        {insertItems.map(({ name, key, items }, index) => (
          <DropdownMenuGroup key={key} className="flex flex-col gap-1">
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-foreground select-none px-2 py-1.5 text-xs font-semibold">
              {name}
            </DropdownMenuLabel>

            {items.map(({ icon, label, value: itemValue }) => {
              if (itemValue === 'image') {
                return (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleSelect(itemValue);
                    }}
                    key={itemValue}
                    className="*:first:[span]:hidden w-48 cursor-pointer p-0"
                  >
                    <ButtonUploadImage
                      className="w-full gap-2 px-2 py-1.5"
                      key={itemValue}
                      onSuccess={({ postURL }) => {
                        if (postURL) {
                          editor
                            .chain()
                            .focus()
                            .setImage({ src: postURL })
                            .run();
                        }
                      }}
                    >
                      {icon}
                      {label}
                    </ButtonUploadImage>
                  </DropdownMenuItem>
                );
              }

              if (itemValue === 'link') {
                return (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleSelect(itemValue);
                    }}
                    key={itemValue}
                    className="*:first:[span]:hidden w-48 cursor-pointer p-0"
                  >
                    <ButtonLink
                      onSetLink={({ url, text }) => {
                        editor
                          .chain()
                          .focus()
                          .insertContent(`<a href="${url}">${text}</a>`)
                          .run();
                      }}
                    >
                      {icon}
                      {label}
                    </ButtonLink>
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleSelect(itemValue);
                  }}
                  key={itemValue}
                  className="*:first:[span]:hidden w-48 cursor-pointer pl-2"
                >
                  {icon}
                  {label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
