import { Toggle } from '@workspace/ui/components/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { cn } from '@workspace/ui/lib/utils';

type Props = {
  icon: React.ReactNode;
  tooltipContent: string;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  onClick?: () => void;
  pressed?: boolean;
  className?: string;
};

export const ButtonWithTooltip: React.FC<Props> = ({
  icon,
  tooltipContent,
  onClick,
  onPressedChange,
  disabled,
  pressed,
  className,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Toggle
            className={cn('cursor-pointer', className)}
            onClick={onClick}
            onPressedChange={onPressedChange}
            size="sm"
            disabled={disabled}
            pressed={pressed}
          >
            {icon}
          </Toggle>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
