'use client';

import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { ChevronDown, X } from 'lucide-react';
import { Slot as SlotPrimitive } from 'radix-ui';
import * as React from 'react';
import { Badge, BadgeButton } from '@workspace/ui/components/badge';
import {
  Command,
  CommandCheck,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { cn } from '@workspace/ui/lib/utils';

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
};

const buttonVariants = cva(
  'focus-visible:outline-hidden has-data-[arrow=true]:justify-between ring-offset-background group inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90',
        mono: 'bg-zinc-950 text-white hover:bg-zinc-950/90 data-[state=open]:bg-zinc-950/90 dark:bg-zinc-300 dark:text-black dark:hover:bg-zinc-300/90 dark:data-[state=open]:bg-zinc-300/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 data-[state=open]:bg-destructive/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 data-[state=open]:bg-secondary/90',
        outline:
          'bg-background text-accent-foreground border-input hover:bg-accent data-[state=open]:bg-accent border',
        dashed:
          'text-accent-foreground border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:text-accent-foreground border border-dashed',
        ghost:
          'text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        dim: 'text-muted-foreground hover:text-foreground data-[state=open]:text-foreground',
        foreground: '',
        inverse: '',
      },
      appearance: {
        default: '',
        ghost: '',
      },
      underline: {
        solid: '',
        dashed: '',
      },
      underlined: {
        solid: '',
        dashed: '',
      },
      size: {
        lg: 'h-10 gap-1.5 rounded-md px-4 text-sm [&_svg:not([class*=size-])]:size-4',
        md: 'h-8.5 leading-(--text-sm--line-height) gap-1.5 rounded-md px-3 text-[0.8125rem] [&_svg:not([class*=size-])]:size-4',
        sm: 'gap-1.25 h-7 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5',
        icon: 'size-8.5 shrink-0 rounded-md [&_svg:not([class*=size-])]:size-4',
      },
      autoHeight: {
        true: '',
        false: '',
      },
      shape: {
        default: '',
        circle: 'rounded-full',
      },
      mode: {
        default:
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
        icon: 'focus-visible:ring-ring shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2',
        link: 'text-primary h-auto rounded-none bg-transparent p-0 hover:bg-transparent data-[state=open]:bg-transparent',
        input: `hover:bg-background [&_svg]:hover:text-foreground data-[state=open]:bg-background focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-ring/30 [[data-state=open]>&]:border-ring [[data-state=open]>&]:outline-hidden [[data-state=open]>&]:ring-ring/30 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20 in-data-[invalid=true]:border-destructive/60 in-data-[invalid=true]:ring-destructive/10 dark:in-data-[invalid=true]:border-destructive dark:in-data-[invalid=true]:ring-destructive/20 justify-start font-normal focus-visible:ring-[3px] [&_svg]:transition-colors [[data-state=open]>&]:ring-[3px]`,
      },
      placeholder: {
        true: 'text-muted-foreground',
        false: '',
      },
    },
    compoundVariants: [
      // Icons opacity for default mode
      {
        variant: 'ghost',
        mode: 'default',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },
      {
        variant: 'outline',
        mode: 'default',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },
      {
        variant: 'dashed',
        mode: 'default',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },
      {
        variant: 'secondary',
        mode: 'default',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },

      // Icons opacity for default mode
      {
        variant: 'outline',
        mode: 'input',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },
      {
        variant: 'outline',
        mode: 'icon',
        className:
          '[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60',
      },

      // Auto height
      {
        size: 'md',
        autoHeight: true,
        className: 'min-h-8.5 h-auto',
      },
      {
        size: 'sm',
        autoHeight: true,
        className: 'h-auto min-h-7',
      },
      {
        size: 'lg',
        autoHeight: true,
        className: 'h-auto min-h-10',
      },

      // Shadow support
      {
        variant: 'primary',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'mono',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'secondary',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'outline',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'dashed',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'destructive',
        mode: 'default',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },

      // Shadow support
      {
        variant: 'primary',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'mono',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'secondary',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'outline',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'dashed',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },
      {
        variant: 'destructive',
        mode: 'icon',
        appearance: 'default',
        className: 'shadow-xs shadow-black/5',
      },

      // Link
      {
        variant: 'primary',
        mode: 'link',
        underline: 'solid',
        className:
          'text-primary hover:text-primary/90 font-medium hover:underline hover:decoration-solid hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'primary',
        mode: 'link',
        underline: 'dashed',
        className:
          'text-primary hover:text-primary/90 font-medium decoration-1 hover:underline hover:decoration-dashed hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'primary',
        mode: 'link',
        underlined: 'solid',
        className:
          'text-primary hover:text-primary/90 font-medium underline decoration-solid underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'primary',
        mode: 'link',
        underlined: 'dashed',
        className:
          'text-primary hover:text-primary/90 font-medium underline decoration-dashed decoration-1 underline-offset-4 [&_svg]:opacity-60',
      },

      {
        variant: 'inverse',
        mode: 'link',
        underline: 'solid',
        className:
          'font-medium text-inherit hover:underline hover:decoration-solid hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'inverse',
        mode: 'link',
        underline: 'dashed',
        className:
          'font-medium text-inherit decoration-1 hover:underline hover:decoration-dashed hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'inverse',
        mode: 'link',
        underlined: 'solid',
        className:
          'font-medium text-inherit underline decoration-solid underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'inverse',
        mode: 'link',
        underlined: 'dashed',
        className:
          'font-medium text-inherit underline decoration-dashed decoration-1 underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },

      {
        variant: 'foreground',
        mode: 'link',
        underline: 'solid',
        className:
          'text-foreground font-medium hover:underline hover:decoration-solid hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'foreground',
        mode: 'link',
        underline: 'dashed',
        className:
          'text-foreground font-medium decoration-1 hover:underline hover:decoration-dashed hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'foreground',
        mode: 'link',
        underlined: 'solid',
        className:
          'text-foreground font-medium underline decoration-solid underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },
      {
        variant: 'foreground',
        mode: 'link',
        underlined: 'dashed',
        className:
          'text-foreground font-medium underline decoration-dashed decoration-1 underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60',
      },

      // Ghost
      {
        variant: 'primary',
        appearance: 'ghost',
        className:
          'text-primary/90 hover:bg-primary/5 data-[state=open]:bg-primary/5 bg-transparent',
      },
      {
        variant: 'destructive',
        appearance: 'ghost',
        className:
          'text-destructive/90 hover:bg-destructive/5 data-[state=open]:bg-destructive/5 bg-transparent',
      },
      {
        variant: 'ghost',
        mode: 'icon',
        className: 'text-muted-foreground',
      },

      // Size
      {
        size: 'sm',
        mode: 'icon',
        className: '[[&_svg:not([class*=size-])]:size-3.5 h-7 w-7 p-0',
      },
      {
        size: 'md',
        mode: 'icon',
        className: 'w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4',
      },
      {
        size: 'icon',
        className: 'w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4',
      },
      {
        size: 'lg',
        mode: 'icon',
        className: 'h-10 w-10 p-0 [&_svg:not([class*=size-])]:size-4',
      },

      // Input mode
      {
        mode: 'input',
        placeholder: true,
        variant: 'outline',
        className: 'text-muted-foreground font-normal',
      },
      {
        mode: 'input',
        variant: 'outline',
        size: 'sm',
        className: 'gap-1.25',
      },
      {
        mode: 'input',
        variant: 'outline',
        size: 'md',
        className: 'gap-1.5',
      },
      {
        mode: 'input',
        variant: 'outline',
        size: 'lg',
        className: 'gap-1.5',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      mode: 'default',
      size: 'md',
      shape: 'default',
      appearance: 'default',
    },
  },
);

function Button({
  className,
  selected,
  variant,
  shape,
  appearance,
  mode,
  size,
  autoHeight,
  underlined,
  underline,
  asChild = false,
  placeholder = false,
  type = 'button',
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    selected?: boolean;
    asChild?: boolean;
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          shape,
          appearance,
          mode,
          autoHeight,
          placeholder,
          underlined,
          underline,
          className,
        }),
        asChild && props.disabled && 'pointer-events-none opacity-50',
      )}
      {...(selected && { 'data-state': 'open' })}
      type={type}
      {...props}
    />
  );
}

type ButtonArrowProps = {
  icon?: LucideIcon; // Allows passing any Lucide icon
} & React.SVGProps<SVGSVGElement>;

function ButtonArrow({
  icon: Icon = ChevronDown,
  className,
  ...props
}: ButtonArrowProps) {
  return (
    <Icon
      data-slot="button-arrow"
      className={cn('-me-1 ms-auto', className)}
      {...props}
    />
  );
}

export const MultipleSelectDefault: React.FC<Props> = ({
  options,
  selectedValues,
  setSelectedValues,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (value: string) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value],
    );
  };

  const removeSelection = (value: string) => {
    setSelectedValues(selectedValues.filter((v) => v !== value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          autoHeight={true}
          mode="input"
          placeholder={selectedValues.length === 0}
          className="shadow-xs relative min-h-9 w-full p-1"
        >
          <div className="flex flex-wrap items-center gap-1 pe-2.5">
            {selectedValues.length > 0 ? (
              selectedValues.map((val) => {
                const option = options.find((c) => c.value === val);
                return option ? (
                  <Badge key={val} variant="outline">
                    {option.label}
                    <BadgeButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelection(val);
                      }}
                    >
                      <X />
                    </BadgeButton>
                  </Badge>
                ) : null;
              })
            ) : (
              <span className="px-2.5">Select options</span>
            )}
          </div>
          <ButtonArrow className="absolute end-3 top-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={() => toggleSelection(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {selectedValues.includes(option.value) && <CommandCheck />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
