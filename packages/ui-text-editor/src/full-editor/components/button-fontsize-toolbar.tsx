'use client';

import type { Editor } from '@tiptap/react';
import type { EditorState } from '../types';
import { MinusIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { cn } from '@workspace/ui/lib/utils';

const DEFAULT_FONT_SIZE = '16';

const FONT_SIZE_MAP = {
  h1: '36',
  h2: '24',
  h3: '20',
} as const;

const FONT_SIZES = [
  '8',
  '9',
  '10',
  '12',
  '14',
  '16',
  '18',
  '24',
  '30',
  '36',
  '48',
  '60',
  '72',
  '96',
] as const;

type Props = {
  editor: Editor;
  editorState: EditorState;
};

const toUnitLess = (value: string | number | null): number | null => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string' || value.trim() === '') return null;

  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

export const FontSizeToolbarButton: React.FC<Props> = ({
  editor,
  editorState,
}) => {
  const [inputValue, setInputValue] = useState(DEFAULT_FONT_SIZE);
  const [isFocused, setIsFocused] = useState(false);

  // Lấy font-size hiện tại từ selection
  const cursorFontSize = () => {
    const marks = editorState?.fontSize;
    if (marks) {
      return toUnitLess(marks);
    }

    const parent = editor.state.selection.$from.parent;
    if (parent?.type?.name && parent.type.name in FONT_SIZE_MAP) {
      return FONT_SIZE_MAP[parent.type.name as keyof typeof FONT_SIZE_MAP];
    }

    return DEFAULT_FONT_SIZE;
  };

  const handleInputChange = () => {
    const newSize = toUnitLess(inputValue);
    if (!newSize || newSize < 1 || newSize > 100) {
      editor.chain().focus().run();
      return;
    }
    if (newSize !== toUnitLess(cursorFontSize())) {
      editor
        .chain()
        .focus()
        .setMark('textStyle', { fontSize: `${newSize}px` })
        .run();
    }
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Number(cursorFontSize()) + delta;
    editor
      .chain()
      .focus()
      .setMark('textStyle', { fontSize: `${newSize}px` })
      .run();
  };

  const displayValue = isFocused ? inputValue : cursorFontSize();

  return (
    <div className="flex h-7 items-center gap-1 rounded-md p-0">
      <Button
        size="icon"
        className="size-8"
        onClick={() => handleFontSizeChange(-1)}
        variant="ghost"
      >
        <MinusIcon />
      </Button>

      <Popover open={isFocused} modal={false}>
        <PopoverTrigger asChild>
          <Input
            className={cn(
              'h-full w-10 shrink-0 border-none px-1 text-center text-sm shadow-none ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0',
            )}
            value={String(displayValue)}
            onBlur={() => {
              setIsFocused(false);
              handleInputChange();
            }}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setInputValue(
                String(toUnitLess(cursorFontSize()) ?? DEFAULT_FONT_SIZE),
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleInputChange();
              }
            }}
            type="text"
          />
        </PopoverTrigger>
        <PopoverContent
          className="flex w-10 flex-col p-0 px-0.5 py-1"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {FONT_SIZES.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size="sm"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .setMark('textStyle', { fontSize: `${size}px` })
                  .run();
                setIsFocused(false);
              }}
              className={cn(
                displayValue === size ? 'bg-muted' : 'bg-transparent',
              )}
              data-highlighted={size === displayValue}
              type="button"
            >
              {size}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Button
        size="icon"
        className="size-8"
        onClick={() => handleFontSizeChange(1)}
        variant="ghost"
      >
        <Plus />
      </Button>
    </div>
  );
};
