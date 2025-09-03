'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';

type Props = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
  tooltipTriggerProps?: React.ComponentProps<typeof TooltipTrigger>;
  tooltipContentProps?: React.ComponentProps<typeof TooltipContent>;
};

export const CustomTooltip: React.FC<Props> = ({
  trigger,
  content,
  tooltipProps,
  tooltipTriggerProps,
  tooltipContentProps,
}) => {
  return (
    <TooltipProvider>
      <Tooltip {...tooltipProps}>
        <TooltipTrigger asChild {...tooltipTriggerProps}>
          {trigger}
        </TooltipTrigger>
        <TooltipContent {...tooltipContentProps}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
