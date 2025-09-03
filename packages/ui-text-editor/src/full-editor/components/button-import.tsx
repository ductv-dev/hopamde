'use client';

import type { Editor } from '@tiptap/react';
import { ArrowUpToLineIcon, ChevronDownIcon } from 'lucide-react';
import { marked } from 'marked';
import { useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { ButtonWithTooltip } from './button-with-tooltip';

type Props = {
  editor: Editor;
};

export const ImportToolbarButton: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const getHtmlBodyContent = (fullHtmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtmlString, 'text/html');
    const bodyContent = doc.body.innerHTML;
    return bodyContent;
  };

  const { openFilePicker: openMdFilePicker } = useFilePicker({
    accept: ['.md', '.mdx'],
    multiple: false,
    onFilesSelected: async (data: { plainFiles?: File[] }) => {
      if (!data.plainFiles?.length) return;
      const text = (await data.plainFiles[0]?.text()) || '';

      marked.setOptions({
        gfm: true,
        breaks: true,
        pedantic: false,
      });

      const htmlContent = marked.parse(text);

      editor.commands.setContent(htmlContent);
    },
  });
  const { openFilePicker: openHtmlFilePicker } = useFilePicker({
    accept: ['text/html'],
    multiple: false,
    onFilesSelected: async (data: { plainFiles?: File[] }) => {
      if (!data.plainFiles?.length) return;
      const text = (await data.plainFiles[0]?.text()) || '';
      const bodyContent = getHtmlBodyContent(text);
      editor?.commands.insertContent(bodyContent);
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <ButtonWithTooltip
        icon={
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-1">
              <ArrowUpToLineIcon className="size-4" />
              <ChevronDownIcon className="size-3.5" data-icon />
            </span>
          </DropdownMenuTrigger>
        }
        tooltipContent="Import"
        pressed={open}
      />

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              openHtmlFilePicker();
            }}
          >
            Import from HTML
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              openMdFilePicker();
            }}
          >
            Import from Markdown
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
