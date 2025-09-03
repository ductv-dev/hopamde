import type { Editor } from '@tiptap/react';
import type { EditorState } from '../types';
import { CheckIcon, WrapTextIcon } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { ButtonWithTooltip } from './button-with-tooltip';

type Props = {
  editor: Editor | null;
  editorState: EditorState;
};

const item = ['1', '1.2', '1.5', '2', '3'];

export const LineHeightButton: React.FC<Props> = ({ editor, editorState }) => {
  const [open, setOpen] = useState(false);
  const currentValue = () => {
    if (editorState?.isSmall) {
      return '1.2';
    }
    if (editorState?.isMedium) {
      return '1.5';
    }
    if (editorState?.isLarge) {
      return '2';
    }
    if (editorState?.isXLarge) {
      return '3';
    }
    return '1';
  };

  const onValueChange = (value: string) => {
    editor?.chain().focus().toggleTextStyle({ lineHeight: value }).run();
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={<WrapTextIcon className="size-4" />}
            pressed={open}
            tooltipContent={'Line Height'}
          />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuRadioGroup onValueChange={onValueChange}>
          {item.map((key) => (
            <DropdownMenuRadioItem
              key={key}
              className={cn(
                'cursor-pointer pl-2',
                key === currentValue() && 'bg-accent',
              )}
              value={key}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">{key}</div>
                {key === currentValue() && <CheckIcon />}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
