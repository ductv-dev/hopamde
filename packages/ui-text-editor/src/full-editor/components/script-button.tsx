import type { Editor } from '@tiptap/react';
import type { EditorState } from '../types';
import {
  CheckIcon,
  EllipsisIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from 'lucide-react';
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

const item: Record<string, { icon: React.ReactNode; label: string }> = {
  superscript: {
    icon: <SuperscriptIcon className="size-4" />,
    label: 'Superscript',
  },

  subscript: {
    icon: <SubscriptIcon className="size-4" />,
    label: 'Subscript',
  },
};

export const ScriptButton: React.FC<Props> = ({ editor, editorState }) => {
  const [open, setOpen] = useState(false);
  const currentValue = () => {
    if (editorState?.isSuperscript) {
      return 'superscript';
    }
    if (editorState?.isSubscript) {
      return 'subscript';
    }
    return 'none';
  };

  const onValueChange = (value: string) => {
    if (value === 'superscript') {
      editor?.chain().focus().toggleSuperscript().run();
    } else {
      editor?.chain().focus().toggleSubscript().run();
    }
    editor?.commands.focus();
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={<EllipsisIcon className="size-4" />}
            pressed={open}
            tooltipContent={'Insert'}
          />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuRadioGroup onValueChange={onValueChange}>
          {Object.entries(item).map(([key, value]) => (
            <DropdownMenuRadioItem
              key={key}
              className={cn(
                'cursor-pointer pl-2',
                key === currentValue() && 'bg-accent',
              )}
              value={key}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
                {key === currentValue() && <CheckIcon />}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
