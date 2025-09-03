'use client';

import type { Editor } from '@tiptap/react';
import html2canvas from 'html2canvas-pro';
import { ArrowDownToLineIcon, ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
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

export const ExportToolbarButton: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const getCanvas = async () => {
    const style = document.createElement('style');
    document.head.append(style);

    const canvas = await html2canvas(editor.view.dom);
    style.remove();

    return canvas;
  };

  const downloadFile = async (url: string, filename: string) => {
    const response = await fetch(url);

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  };

  const exportToPdf = async () => {
    const canvas = await getCanvas();

    const PDFLib = await import('pdf-lib');
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage([canvas.width, canvas.height]);
    const imageEmbed = await pdfDoc.embedPng(canvas.toDataURL('PNG'));
    const { height, width } = imageEmbed.scale(1);
    page.drawImage(imageEmbed, {
      height,
      width,
      x: 0,
      y: 0,
    });
    const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

    await downloadFile(pdfBase64, 'idealabs.pdf');
  };

  const exportToImage = async () => {
    const canvas = await getCanvas();
    await downloadFile(canvas.toDataURL('image/png'), 'idealabs.png');
  };

  const exportToHtml = async () => {
    if (!editor) return;

    // Bước 1: Lấy nội dung HTML từ editor
    const editorHtml = editor.getHTML();

    const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        
        ${katexCss}
        <style>
          :root {
            --font-sans: 'Inter', 'Inter Fallback';
            --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
          }
        </style>
      </head>
      <body>
        ${editorHtml}
      </body>
    </html>`;

    const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

    await downloadFile(url, 'idealabs.html');
  };

  const exportToMarkdown = async () => {
    if (!editor) return;

    try {
      // Step 1: Get HTML content from the editor
      const editorHtml = editor.getHTML();

      // Step 2: Dynamically import Turndown for HTML-to-Markdown conversion
      const TurndownService = (await import('turndown')).default;
      const turndownService = new TurndownService({
        headingStyle: 'atx', // Use # for headings
        codeBlockStyle: 'fenced', // Use ``` for code blocks
        bulletListMarker: '-', // Use - for unordered lists
        emDelimiter: '_', // Use _ for italic
        strongDelimiter: '**', // Use ** for bold
      });

      // Custom rule for tables
      turndownService.addRule('table', {
        filter: ['table'],
        replacement: function (_, node: any) {
          // Extract rows and cells
          const rows = Array.from(node.querySelectorAll('tr')).map(
            (row: any) => {
              const cells = Array.from(row.querySelectorAll('th, td')).map(
                (cell: any) => cell.textContent?.trim().replace(/\n/g, ' '),
              );
              return `| ${cells.join(' | ')} |`;
            },
          );

          // Create header separator
          const headerRow = node.querySelector('tr');
          const cellCount = headerRow
            ? headerRow.querySelectorAll('th, td').length
            : 0;
          const separator = `| ${Array(cellCount).fill('---').join(' | ')} |`;

          // Insert separator after the first row (header)
          if (rows.length > 0) {
            rows.splice(1, 0, separator);
          }

          return rows.join('\n') + '\n';
        },
      });

      // Custom rule for images
      turndownService.addRule('image', {
        filter: ['img'],
        replacement: function (_, node: any) {
          const src = node.getAttribute('src') || '';
          const alt = node.getAttribute('alt') || '';
          return `![${alt}](${src})`;
        },
      });

      // Step 3: Convert HTML to Markdown
      const markdown = turndownService.turndown(editorHtml);

      // Step 4: Create a data URL for the Markdown content
      const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`;

      // Step 5: Trigger download
      await downloadFile(url, 'idealabs.md');
    } catch (error) {
      console.error('Failed to export to Markdown:', error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <ButtonWithTooltip
        icon={
          <DropdownMenuTrigger asChild>
            <span className="flex items-center gap-1">
              <ArrowDownToLineIcon className="size-4" />
              <ChevronDownIcon className="size-3.5" data-icon />
            </span>
          </DropdownMenuTrigger>
        }
        tooltipContent="Export"
        pressed={open}
      />

      {/* Nội dung của Dropdown Menu */}
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={exportToHtml}>
            Export as HTML
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToPdf}>
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToImage}>
            Export as Image
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToMarkdown}>
            Export as Markdown
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
