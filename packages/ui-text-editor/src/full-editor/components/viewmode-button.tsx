import { CheckIcon, ChevronDownIcon, EyeIcon, PenIcon } from 'lucide-react';
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

const item: Record<string, { icon: React.ReactNode; label: string }> = {
  editing: {
    icon: <PenIcon className="size-4" />,
    label: 'Editing',
  },

  viewing: {
    icon: <EyeIcon className="size-4" />,
    label: 'Viewing',
  },
};

type Props = {
  setIsReadonly: (value: boolean) => void;
  isReadonly: boolean;
};

export const ViewModeButton: React.FC<Props> = ({
  setIsReadonly,
  isReadonly,
}) => {
  const [open, setOpen] = useState(false);
  const currentValue = isReadonly ? 'viewing' : 'editing';
  const onValueChange = (value: string) => {
    if (value === 'viewing') {
      setIsReadonly(true);
    } else {
      setIsReadonly(false);
    }
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item?.[currentValue]?.icon}
                  <span className="font-semibold">
                    {item?.[currentValue]?.label}
                  </span>
                </div>
                <ChevronDownIcon />
              </div>
            }
            pressed={open}
            tooltipContent={'Editing mode'}
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
                key === currentValue && 'bg-accent',
              )}
              value={key}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
                {key === currentValue && <CheckIcon />}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
