'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from 'usehooks-ts';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useToast } from '../hooks/use-toast';

type CopyButtonProps = {
  content: string;
};

export function CopyButton({ content }: CopyButtonProps) {
  const { toastSuccess } = useToast();
  const [isCopied, onCopy] = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-6 w-6"
      aria-label="Sao chép"
      onClick={() =>
        onCopy(content).then(() => {
          toastSuccess('Copied to clipboard!');
        })
      }
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Check
          className={cn(
            'h-4 w-4 transition-transform ease-in-out',
            isCopied ? 'scale-100' : 'scale-0',
          )}
        />
      </div>
      <Copy
        className={cn(
          'h-4 w-4 transition-transform ease-in-out',
          isCopied ? 'scale-0' : 'scale-100',
        )}
      />
    </Button>
  );
}
