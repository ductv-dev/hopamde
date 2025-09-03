import type { Editor } from '@tiptap/react';
import { ChevronDownIcon, ImageIcon, LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { env } from '@workspace/ui-utils';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { cn } from '@workspace/ui/lib/utils';
import { ButtonUploadImage } from './button-upload-image';

const item: Record<string, { icon: React.ReactNode; label: string }> = {
  computer: {
    icon: <ImageIcon className="size-4" />,
    label: 'Upload from computer',
  },

  url: {
    icon: <LinkIcon className="size-4" />,
    label: 'Insert via URL',
  },
};

type Props = {
  editor: Editor | null;
};

export const ImportImageButton: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [openDialogUrl, setOpenDialogUrl] = useState(false);

  const onValueChange = (value: string) => {
    if (value !== 'computer') {
      setOpenDialogUrl(true);
    }

    editor?.commands.focus();
  };

  const [imageUrl, setImageUrl] = useState('');

  const onSubmit = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setOpenDialogUrl(false);
    }
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'flex h-8 items-center justify-center overflow-hidden rounded-md',
                open && 'bg-accent',
              )}
            >
              <ButtonUploadImage
                onSuccess={({ key }) => {
                  if (key) {
                    editor
                      ?.chain()
                      .focus()
                      .setImage({ src: `${env.POST_URL}/${key}` })
                      .run();
                    setOpenDialogUrl(false);
                  }
                }}
              >
                <ImageIcon className="size-4" />
              </ButtonUploadImage>

              <DropdownMenuTrigger asChild>
                <div className="hover:bg-accent flex h-full cursor-pointer items-center">
                  <ChevronDownIcon className="size-4" />
                </div>
              </DropdownMenuTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Import Image</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="w-52">
          <DropdownMenuRadioGroup onValueChange={onValueChange}>
            {Object.entries(item).map(([key, value]) => {
              if (key === 'computer') {
                return (
                  <DropdownMenuRadioItem
                    key={key}
                    className={cn('cursor-pointer pl-0.5')}
                    value={key}
                  >
                    <ButtonUploadImage
                      onSuccess={({ key }) => {
                        if (key) {
                          editor
                            ?.chain()
                            .focus()
                            .setImage({ src: `${env.POST_URL}/${key}` })
                            .run();
                          setOpenDialogUrl(false);
                        }
                      }}
                    >
                      <div className="flex w-full items-center gap-2">
                        {value.icon}
                        {value.label}
                      </div>
                    </ButtonUploadImage>
                  </DropdownMenuRadioItem>
                );
              }

              return (
                <DropdownMenuRadioItem
                  key={key}
                  className={cn('cursor-pointer pl-2')}
                  value={key}
                >
                  <div className="flex w-full items-center gap-2">
                    {value.icon}
                    {value.label}
                  </div>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDialogUrl} onOpenChange={setOpenDialogUrl}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={onSubmit}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
