import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useToast } from '@workspace/ui/hooks-tsx/use-toast';
import { ButtonWithTooltip } from './button-with-tooltip';

type Props = {
  onSetLink: (data: { url: string; text: string }) => void;
};

export const ButtonLink: React.FC<PropsWithChildren<Props>> = ({
  onSetLink,
  children,
}) => {
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const { toastError } = useToast();

  const setLink = () => {
    const url = linkUrl.trim();

    const text = linkText.trim();

    if (!url || !text) {
      toastError('Please enter a valid URL and text');
      return;
    }

    onSetLink({ url, text: linkText });
    setLinkUrl('');
    setLinkDropdownOpen(false);
  };

  return (
    <DropdownMenu open={linkDropdownOpen} onOpenChange={setLinkDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <span>
          <ButtonWithTooltip
            icon={children}
            tooltipContent="Link"
            onPressedChange={() => setLinkDropdownOpen(!linkDropdownOpen)}
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4">
        <div className="space-y-3">
          <div>
            <Label htmlFor="link-url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="link-url"
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="link-text" className="text-sm font-medium">
              Text to display
            </Label>
            <Input
              id="link-text"
              type="text"
              placeholder="Text to display"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={setLink}
              size="sm"
              className="flex-1"
            >
              Add Link
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
