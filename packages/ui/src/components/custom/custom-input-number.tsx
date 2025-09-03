'use client';

import type { NumberFieldProps } from 'react-aria-components';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button, Group, Input, NumberField } from 'react-aria-components';

export const CustomInputNumber: React.FC<
  NumberFieldProps & {
    placeholder?: string;
  }
> = ({ placeholder = '0', ...props }) => {
  return (
    <NumberField {...props}>
      <Group className="doutline-none border-input shadow-xs data-disabled:opacity-50 data-focus-within:border-ring/60 data-focus-within:ring-[3px] data-focus-within:ring-ring/10 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border text-sm transition-[color,box-shadow]">
        <Input
          placeholder={placeholder}
          className="bg-background text-foreground w-full flex-1 px-3 py-2 tabular-nums focus-visible:outline-0"
        />
        <div className="flex h-[calc(100%+2px)] flex-col">
          <Button
            slot="increment"
            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronUpIcon size={12} aria-hidden="true" />
          </Button>
          <Button
            slot="decrement"
            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronDownIcon size={12} aria-hidden="true" />
          </Button>
        </div>
      </Group>
    </NumberField>
  );
};
