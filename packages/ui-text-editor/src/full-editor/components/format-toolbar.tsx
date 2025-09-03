import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import type { EditorState } from '../types';
import {
  CheckIcon,
  ChevronDownIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { ButtonWithTooltip } from './button-with-tooltip';

const turnIntoItems = [
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
    icon: <Heading4Icon className="size-4" />,
    keywords: ['subtitle', 'h4'],
    label: 'Heading 4',
    value: 'h4',
  },
  {
    icon: <Heading5Icon className="size-4" />,
    keywords: ['subtitle', 'h5'],
    label: 'Heading 5',
    value: 'h5',
  },
  {
    icon: <Heading6Icon className="size-4" />,
    keywords: ['subtitle', 'h6'],
    label: 'Heading 6',
    value: 'h6',
  },
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
  //   {
  //     icon: <ChevronRightIcon />,
  //     keywords: ['collapsible', 'expandable'],
  //     label: 'Toggle list',
  //     value: 'toggle',
  //   },
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
    icon: <Columns3Icon className="size-4" />,
    label: '3 columns',
    value: 'action_three_columns',
  },
];

type Props = {
  editor: Editor;
  editorState: EditorState;
};

export const FormatToolbar: React.FC<Props> = ({ editor, editorState }) => {
  const [open, setOpen] = useState(false);

  const currentType = useMemo(() => {
    const typeMap: Partial<Record<keyof EditorState, string>> = {
      isHeading1: 'h1',
      isHeading2: 'h2',
      isHeading3: 'h3',
      isHeading4: 'h4',
      isHeading5: 'h5',
      isHeading6: 'h6',
      isBulletList: 'ul',
      isOrderedList: 'ol',
      isCodeBlock: 'codeBlock',
      isBlockquote: 'blockquote',
      isCode: 'code',
      isParagraph: 'paragraph',
    };

    return (
      Object.entries(typeMap).find(
        ([key]) => editorState[key as keyof EditorState],
      )?.[1] ?? 'paragraph'
    );
  }, [editorState]);

  const selectedItem = useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (currentType ?? 'paragraph'),
      ) ?? turnIntoItems[0],
    [currentType],
  );

  const handleSelect = (itemValue: string) => {
    if (
      itemValue === 'h1' ||
      itemValue === 'h2' ||
      itemValue === 'h3' ||
      itemValue === 'h4' ||
      itemValue === 'h5' ||
      itemValue === 'h6'
    ) {
      editor
        .chain()
        .focus()
        .setHeading({ level: Number(itemValue.slice(1)) as Level })
        .run();
    }
    if (itemValue === 'ul') {
      editor.chain().focus().setNode('listItem').wrapIn('bulletList').run();
    }
    if (itemValue === 'ol') {
      editor.chain().focus().setNode('listItem').wrapIn('orderedList').run();
    }
    if (itemValue === 'codeBlock') {
      editor.chain().focus().setCodeBlock().run();
    }
    if (itemValue === 'blockquote') {
      editor.chain().focus().setBlockquote().run();
    }
    if (itemValue === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    }
    if (itemValue === 'todo') {
      editor.chain().focus().setNode('listItem').wrapIn('taskList').run();
    }
    if (itemValue === 'action_three_columns') {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }

    editor.commands.focus();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={
              <div className="flex w-full items-center justify-between gap-1">
                <span className="whitespace-nowrap font-semibold">
                  {selectedItem?.label}
                </span>
                <ChevronDownIcon className="size-4" />
              </div>
            }
            tooltipContent="Turn into"
            pressed={open}
            className="relative w-32"
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
        <DropdownMenuLabel className="text-foreground select-none px-2 py-1.5 text-xs font-semibold">
          Turn into
        </DropdownMenuLabel>
        {turnIntoItems.map(({ icon, label, value: itemValue }) => (
          <DropdownMenuCheckboxItem
            onSelect={(e) => {
              e.preventDefault();
              handleSelect(itemValue);
            }}
            key={itemValue}
            className="*:first:[span]:hidden w-48 cursor-pointer pl-2"
          >
            {itemValue === currentType && (
              <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
                <CheckIcon />
              </span>
            )}
            {icon}
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
