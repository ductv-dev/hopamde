import type { Editor } from '@tiptap/react';
import type { EditorState } from '../types';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEditorState } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  Code2Icon,
  FoldVerticalIcon,
  Grid2X2PlusIcon,
  Grid2x2XIcon,
  HighlighterIcon,
  IndentIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  OutdentIcon,
  PaintBucketIcon,
  Redo2Icon,
  SmileIcon,
  StrikethroughIcon,
  TableIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { Toggle } from '@workspace/ui/components/toggle';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { cn } from '@workspace/ui/lib/utils';
import { FontSizeToolbarButton } from './button-fontsize-toolbar';
import { ImportImageButton } from './button-import-image';
import { ButtonWithTooltip } from './button-with-tooltip';
import { EditerSeparator } from './editer-separator';
import { EditorColorPicker } from './editor-color-picker';
import { FormatToolbar } from './format-toolbar';
import { InsertToolbar } from './insert-toolbar';
import { LineHeightButton } from './line-height-button';
import { ScriptButton } from './script-button';

type Props = {
  editor: Editor | null;
};

const defaultState = {
  canUndo: false,
  canRedo: false,
  isBold: false,
  canBold: false,
  isItalic: false,
  canItalic: false,
  isStrike: false,
  canStrike: false,
  isCode: false,
  canCode: false,
  canClearMarks: false,
  isParagraph: false,
  isHeading1: false,
  isHeading2: false,
  isHeading3: false,
  isHeading4: false,
  isHeading5: false,
  isHeading6: false,
  isBulletList: false,
  isOrderedList: false,
  isCodeBlock: false,
  isBlockquote: false,
  isSubscript: false,
  isSuperscript: false,
  isXSmall: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isXLarge: false,
  fontSize: '16px',
};

export const MenuBar: React.FC<Props> = ({ editor }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openBackgroundColorPicker, setOpenBackgroundColorPicker] =
    useState(false);
  const [isReadonly] = useState(editor?.isEditable || false);

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const editorState: EditorState =
    useEditorState({
      editor,
      selector: (ctx) => {
        return {
          isBold: ctx.editor?.isActive('bold') ?? false,
          canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
          isItalic: ctx.editor?.isActive('italic') ?? false,
          canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
          isStrike: ctx.editor?.isActive('strike') ?? false,
          canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
          isCode: ctx.editor?.isActive('code') ?? false,
          canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
          canClearMarks:
            ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
          isParagraph: ctx.editor?.isActive('paragraph') ?? false,
          isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
          isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
          isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
          isHeading4: ctx.editor?.isActive('heading', { level: 4 }) ?? false,
          isHeading5: ctx.editor?.isActive('heading', { level: 5 }) ?? false,
          isHeading6: ctx.editor?.isActive('heading', { level: 6 }) ?? false,
          isBulletList: ctx.editor?.isActive('bulletList') ?? false,
          isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
          isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
          isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
          canUndo: ctx.editor?.can().chain().undo().run() ?? false,
          canRedo: ctx.editor?.can().chain().redo().run() ?? false,
          isSubscript: ctx.editor?.isActive('subscript') ?? false,
          isSuperscript: ctx.editor?.isActive('superscript') ?? false,
          isXSmall:
            ctx.editor?.isActive('textStyle', { lineHeight: '1' }) ?? false,
          isSmall:
            ctx.editor?.isActive('textStyle', { lineHeight: '1.2' }) ?? false,
          isMedium:
            ctx.editor?.isActive('textStyle', { lineHeight: '1.5' }) ?? false,
          isLarge:
            ctx.editor?.isActive('textStyle', { lineHeight: '2' }) ?? false,
          isXLarge:
            ctx.editor?.isActive('textStyle', { lineHeight: '3' }) ?? false,
          fontSize: ctx.editor?.getAttributes('textStyle')?.fontSize ?? '16px',
        };
      },
    }) || defaultState;

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = linkUrl.trim();
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setLinkUrl('');
    setLinkDropdownOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkDropdownOpen(false);
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  const alignIcon = () => {
    if (editor.isActive({ textAlign: 'left' })) {
      return <AlignLeftIcon className="h-4 w-4" />;
    }
    if (editor.isActive({ textAlign: 'center' })) {
      return <AlignCenterIcon className="h-4 w-4" />;
    }
    if (editor.isActive({ textAlign: 'right' })) {
      return <AlignRightIcon className="h-4 w-4" />;
    }
    if (editor.isActive({ textAlign: 'justify' })) {
      return <AlignJustifyIcon className="h-4 w-4" />;
    }
    return <AlignLeftIcon className="h-4 w-4" />;
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          'no-scrollbar flex w-full items-center overflow-x-auto border-b p-1',
          isReadonly && 'justify-end',
        )}
      >
        {/* History */}

        {!isReadonly && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <ButtonWithTooltip
                icon={<Undo2Icon className="h-4 w-4" />}
                tooltipContent="Undo"
                onPressedChange={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
              />
              <ButtonWithTooltip
                icon={<Redo2Icon className="h-4 w-4" />}
                tooltipContent="Redo"
                onPressedChange={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
              />
            </div>
            <EditerSeparator />
            {/* <div className="flex items-center gap-1">
              <ExportToolbarButton editor={editor} />
              <ImportToolbarButton editor={editor} />
            </div> */}

            {/* <EditerSeparator /> */}
            <div className="flex items-center gap-1">
              <InsertToolbar editor={editor} />
              <FormatToolbar editor={editor} editorState={editorState} />
              <FontSizeToolbarButton
                editor={editor}
                editorState={editorState}
              />
            </div>

            <EditerSeparator />

            {/* Text Formatting */}
            <div className="flex items-center gap-1">
              <ButtonWithTooltip
                icon={<BoldIcon className="h-4 w-4" />}
                tooltipContent="Bold"
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                pressed={editor.isActive('bold')}
              />
              <ButtonWithTooltip
                icon={<ItalicIcon className="h-4 w-4" />}
                tooltipContent="Italic"
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                pressed={editor.isActive('italic')}
              />
              <ButtonWithTooltip
                icon={<UnderlineIcon className="h-4 w-4" />}
                tooltipContent="Underline"
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                pressed={editor.isActive('underline')}
              />

              <ButtonWithTooltip
                icon={<StrikethroughIcon className="h-4 w-4" />}
                tooltipContent="Strikethrough"
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                pressed={editor.isActive('strike')}
              />

              <ButtonWithTooltip
                icon={<Code2Icon className="h-4 w-4" />}
                tooltipContent="Inline Code"
                onPressedChange={() =>
                  editor.chain().focus().toggleCode().run()
                }
                pressed={editor.isActive('code')}
              />

              <EditorColorPicker
                tooltipContent="Text Color"
                triggerNode={
                  <Toggle className="cursor-pointer" size="sm">
                    <BaselineIcon className="h-4 w-4" />
                  </Toggle>
                }
                openColorPicker={openColorPicker}
                onOpenChange={setOpenColorPicker}
                onSelectColor={(color) => {
                  editor.chain().focus().setColor(color).run();
                  setOpenColorPicker(false);
                }}
                onResetColor={() => {
                  editor.chain().focus().unsetColor().run();
                  setOpenColorPicker(false);
                }}
              />

              <EditorColorPicker
                tooltipContent="Background Color"
                triggerNode={
                  <Toggle className="cursor-pointer" size="sm">
                    <PaintBucketIcon className="h-4 w-4" />
                  </Toggle>
                }
                openColorPicker={openBackgroundColorPicker}
                onOpenChange={setOpenBackgroundColorPicker}
                onSelectColor={(color) => {
                  editor.chain().focus().setBackgroundColor(color).run();
                  setOpenBackgroundColorPicker(false);
                }}
                onResetColor={() => {
                  editor.chain().focus().unsetBackgroundColor().run();
                  setOpenBackgroundColorPicker(false);
                }}
              />
            </div>

            <EditerSeparator />

            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <ButtonWithTooltip
                      icon={alignIcon()}
                      tooltipContent="Align"
                      onPressedChange={() => {
                        editor.chain().focus().setTextAlign('left').run();
                      }}
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().setTextAlign('left').run()
                    }
                    className={cn(
                      'cursor-pointer',
                      editor.isActive({ textAlign: 'left' }) ? 'bg-accent' : '',
                    )}
                  >
                    <AlignLeftIcon className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().setTextAlign('center').run()
                    }
                    className={cn(
                      'cursor-pointer',
                      editor.isActive({ textAlign: 'center' })
                        ? 'bg-accent'
                        : '',
                    )}
                  >
                    <AlignCenterIcon className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().setTextAlign('right').run()
                    }
                    className={cn(
                      'cursor-pointer',
                      editor.isActive({ textAlign: 'right' })
                        ? 'bg-accent'
                        : '',
                    )}
                  >
                    <AlignRightIcon className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      editor.chain().focus().setTextAlign('justify').run()
                    }
                    className={cn(
                      'cursor-pointer',
                      editor.isActive({ textAlign: 'justify' })
                        ? 'bg-accent'
                        : '',
                    )}
                  >
                    <AlignJustifyIcon className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ButtonWithTooltip
                icon={<FoldVerticalIcon className="h-4 w-4" />}
                tooltipContent="Horizontal Rule"
                onPressedChange={() =>
                  editor.chain().focus().setHorizontalRule().run()
                }
              />

              <ButtonWithTooltip
                icon={<ListOrderedIcon className="h-4 w-4" />}
                tooltipContent="Numbered List"
                onPressedChange={() =>
                  // editor.chain().focus().toggleOrderedList().run()
                  editor
                    .chain()
                    .focus()
                    .toggleOrderedList()
                    .updateAttributes('orderedList', { type: 'I' })
                    .run()
                }
                pressed={editor.isActive('orderedList')}
              />
              <ButtonWithTooltip
                icon={<ListIcon className="h-4 w-4" />}
                tooltipContent="Bullet List"
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                pressed={editor.isActive('bulletList')}
              />

              <ButtonWithTooltip
                icon={<ListTodoIcon className="h-4 w-4" />}
                tooltipContent="Task List"
                onPressedChange={() =>
                  editor.chain().focus().toggleTaskList().run()
                }
                pressed={editor.isActive('taskList')}
              />
            </div>

            {/* Text Formatting */}
            <EditerSeparator />

            <div className="flex items-center gap-1">
              {/* Links and Media Dropdowns */}
              <DropdownMenu
                open={linkDropdownOpen}
                onOpenChange={setLinkDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <span>
                    <ButtonWithTooltip
                      icon={<LinkIcon className="size-4" />}
                      tooltipContent="Link"
                      onPressedChange={() =>
                        setLinkDropdownOpen(!linkDropdownOpen)
                      }
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
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={setLink}
                        size="sm"
                        className="flex-1"
                      >
                        Add Link
                      </Button>
                      <Button
                        type="button"
                        onClick={removeLink}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Remove Link
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Table Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <ButtonWithTooltip
                      icon={
                        <div className="flex items-center gap-1">
                          <TableIcon className="size-4" />
                          <ChevronDownIcon className="size-4" />
                        </div>
                      }
                      tooltipContent="Table"
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={addTable}>
                    <Grid2X2PlusIcon className="mr-2 h-4 w-4" />
                    Add Table
                  </DropdownMenuItem>
                  {editor.isActive('table') && (
                    <>
                      <DropdownMenuItem onClick={deleteTable}>
                        <Grid2x2XIcon className="mr-2 h-4 w-4" />
                        Delete Table
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={addColumnBefore}>
                              Add Column Before
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={addColumnAfter}>
                              Add Column After
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={deleteColumn}>
                              Delete Column
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Rows</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={addRowBefore}>
                              Add Row Before
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={addRowAfter}>
                              Add Row After
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={deleteRow}>
                              Delete Row
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <span>
                    <ButtonWithTooltip
                      icon={<SmileIcon className="h-4 w-4" />}
                      tooltipContent="Emoji"
                      onPressedChange={() =>
                        setOpenEmojiPicker(!openEmojiPicker)
                      }
                    />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-fit border-none p-0 shadow-none">
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji: any) => {
                      editor.chain().focus().setEmoji(emoji?.id).run();
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <EditerSeparator />

            <div className="flex items-center gap-1">
              <ImportImageButton editor={editor} />
            </div>

            <EditerSeparator />

            <LineHeightButton editor={editor} editorState={editorState} />

            <ButtonWithTooltip
              icon={<OutdentIcon className="h-4 w-4" />}
              tooltipContent="Outdent"
              onPressedChange={() => editor.chain().focus().outdent().run()}
            />

            <ButtonWithTooltip
              icon={<IndentIcon className="h-4 w-4" />}
              tooltipContent="Indent"
              onPressedChange={() => editor.chain().focus().indent().run()}
            />

            <EditerSeparator />

            <ScriptButton editor={editor} editorState={editorState} />
          </div>
        )}

        <div className="flex items-center gap-1">
          <ButtonWithTooltip
            icon={<HighlighterIcon className="h-4 w-4" />}
            tooltipContent="Highlight"
            onPressedChange={() =>
              editor.chain().focus().toggleHighlight().run()
            }
            pressed={editor.isActive('highlight')}
          />

          {/* <div className="h-8">
            <Separator orientation="vertical" />
          </div>

          <ViewModeButton
            isReadonly={isReadonly}
            setIsReadonly={(value) => {
              setIsReadonly(value);
              editor.setEditable(!value);
              editor.commands.focus();
            }}
          /> */}
        </div>
      </div>
    </TooltipProvider>
  );
};
