# UI Text Editor

A comprehensive rich text editor built with TipTap and React, featuring a full suite of formatting options.

## Features

### Text Formatting

- **Bold** - Make text bold
- **Italic** - Make text italic
- **Underline** - Underline text
- **Strikethrough** - Strike through text
- **Inline Code** - Format text as inline code
- **Highlight** - Highlight text with background color
- **Subscript** - Create subscript text
- **Superscript** - Create superscript text

### Headings

- **Heading 1** - Large heading
- **Heading 2** - Medium heading
- **Heading 3** - Small heading
- And more heading levels (H4, H5, H6)

### Text Alignment

- **Left** - Align text to the left
- **Center** - Center align text
- **Right** - Align text to the right
- **Justify** - Justify text

### Lists

- **Bullet List** - Create unordered lists
- **Ordered List** - Create numbered lists
- **Task List** - Create checkable task lists

### Block Elements

- **Blockquote** - Create quoted text blocks
- **Code Block** - Create multi-line code blocks
- **Horizontal Rule** - Insert horizontal dividers

### Media and Links

- **Links** - Add clickable links to text
- **Images** - Insert images from URLs

### Tables

- **Create Tables** - Insert tables with customizable rows and columns
- **Add/Remove Rows** - Dynamically add or remove table rows
- **Add/Remove Columns** - Dynamically add or remove table columns
- **Delete Tables** - Remove entire tables
- **Resizable Columns** - Drag to resize table columns

### History

- **Undo** - Undo the last action
- **Redo** - Redo the last undone action

## Installation

```bash
pnpm add @workspace/ui-text-editor
```

## Usage

### Basic Usage

```tsx
import { FullEditor } from '@workspace/ui-text-editor/full-editor';

function MyComponent() {
  return <FullEditor content="<p>Initial content here</p>" />;
}
```

### With Demo Content

```tsx
import { FullEditorDemo } from '@workspace/ui-text-editor/full-editor/demo';

function MyComponent() {
  return <FullEditorDemo />;
}
```

### Comment Editor

```tsx
import { CommentEditor } from '@workspace/ui-text-editor/comment-editor';

function MyComponent() {
  return <CommentEditor />;
}
```

## API Reference

### FullEditor Props

| Prop      | Type     | Default     | Description                         |
| --------- | -------- | ----------- | ----------------------------------- |
| `content` | `string` | `undefined` | Initial HTML content for the editor |

### Editor Features

#### Text Formatting

```tsx
// Bold
editor.chain().focus().toggleBold().run();

// Italic
editor.chain().focus().toggleItalic().run();

// Underline
editor.chain().focus().toggleUnderline().run();

// Strikethrough
editor.chain().focus().toggleStrike().run();

// Code
editor.chain().focus().toggleCode().run();

// Highlight
editor.chain().focus().toggleHighlight().run();

// Subscript
editor.chain().focus().toggleSubscript().run();

// Superscript
editor.chain().focus().toggleSuperscript().run();
```

#### Headings

```tsx
// Heading 1
editor.chain().focus().toggleHeading({ level: 1 }).run();

// Heading 2
editor.chain().focus().toggleHeading({ level: 2 }).run();

// Heading 3
editor.chain().focus().toggleHeading({ level: 3 }).run();
```

#### Text Alignment

```tsx
// Left align
editor.chain().focus().setTextAlign('left').run();

// Center align
editor.chain().focus().setTextAlign('center').run();

// Right align
editor.chain().focus().setTextAlign('right').run();

// Justify
editor.chain().focus().setTextAlign('justify').run();
```

#### Lists

```tsx
// Bullet list
editor.chain().focus().toggleBulletList().run();

// Ordered list
editor.chain().focus().toggleOrderedList().run();

// Task list
editor.chain().focus().toggleTaskList().run();
```

#### Block Elements

```tsx
// Blockquote
editor.chain().focus().toggleBlockquote().run();

// Code block
editor.chain().focus().toggleCodeBlock().run();

// Horizontal rule
editor.chain().focus().setHorizontalRule().run();
```

#### Links and Images

```tsx
// Add link
editor.chain().focus().setLink({ href: 'https://example.com' }).run();

// Add image
editor.chain().focus().setImage({ src: 'https://example.com/image.jpg' }).run();
```

#### Tables

```tsx
// Insert table
editor
  .chain()
  .focus()
  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
  .run();

// Add column before
editor.chain().focus().addColumnBefore().run();

// Add column after
editor.chain().focus().addColumnAfter().run();

// Delete column
editor.chain().focus().deleteColumn().run();

// Add row before
editor.chain().focus().addRowBefore().run();

// Add row after
editor.chain().focus().addRowAfter().run();

// Delete row
editor.chain().focus().deleteRow().run();

// Delete table
editor.chain().focus().deleteTable().run();
```

#### History

```tsx
// Undo
editor.chain().focus().undo().run();

// Redo
editor.chain().focus().redo().run();
```

## Styling

The editor comes with comprehensive CSS styling that supports:

- Light and dark mode
- Responsive design
- Professional typography
- Proper spacing and layout
- Table styling with borders and hover effects
- Code block syntax highlighting
- Custom selection colors

## Customization

You can customize the editor by:

1. **Modifying the CSS** - Edit `src/styles.css` to change appearance
2. **Adding extensions** - Import and configure additional TipTap extensions
3. **Customizing the toolbar** - Modify `src/full-editor/components/menu-bar.tsx`
4. **Changing placeholder text** - Update the placeholder configuration in the editor setup

## Dependencies

- `@tiptap/react` - Core TipTap React integration
- `@tiptap/starter-kit` - Basic editor features
- `@tiptap/extension-*` - Various formatting extensions
- `@workspace/ui` - UI components
- `lucide-react` - Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This package is part of the workspace and follows the workspace license.
