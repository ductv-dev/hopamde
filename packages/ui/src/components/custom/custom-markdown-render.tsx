'use client';

import type { JSX } from 'react';
import { debounce } from 'es-toolkit/compat';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

function withClass(Tag: keyof JSX.IntrinsicElements, classes: string) {
  const Component = ({ ...props }: any) => (
    <Tag className={classes} {...props} />
  );
  Component.displayName = Tag;
  return Component;
}

const MdComponent = {
  h1: withClass('h1', 'text-2xl font-semibold'),
  h2: withClass('h2', 'font-semibold text-xl'),
  h3: withClass('h3', 'font-semibold text-lg'),
  h4: withClass('h4', 'font-semibold text-base'),
  h5: withClass('h5', 'font-medium'),
  strong: withClass('strong', 'font-semibold'),
  a: withClass('a', 'text-blue-500 hover:underline'),
  img: withClass('img', 'max-w-full object-cover rounded-lg'),
  blockquote: withClass('blockquote', 'pl-4 border-l-4 border-gray-300 italic'),
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <code>{children}</code>
    ) : (
      <code
        className="rounded bg-gray-100 px-1 font-mono text-sm dark:bg-zinc-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => {
    return (
      <pre
        className="my-2 overflow-x-auto rounded bg-gray-100 p-2 dark:bg-zinc-800"
        {...props}
      >
        {children}
      </pre>
    );
  },
  ol: withClass('ol', 'list-decimal pl-6 my-2'),
  ul: withClass('ul', 'list-disc pl-6 my-2'),
  li: withClass('li', 'my-1.5'),
  table: withClass('table', 'border-collapse border w-full my-4'),
  th: withClass(
    'th',
    'border p-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
  ),
  td: withClass(
    'td',
    'border p-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
  ),
  tr: withClass('tr', 'm-0 border-t p-0'),
  p: withClass('p', 'whitespace-pre-wrap'),
  hr: withClass('hr', 'my-4 border-t border-gray-300'),
};

const parseMarkdown = (md: string) => {
  if (!md) return '';

  const parsedText = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .processSync(md)
    .toString();
  return parsedText;
};

type Props = {
  text: string;
};

export const CustomMarkdownRender: React.FC<Props> = ({ text }) => {
  const [parsedComment, setParsedComment] = useState('');
  const debouncedParse = debounce((text: string) => {
    const parsedText = parseMarkdown(text);
    setParsedComment(parsedText);
  }, 360);

  useEffect(() => {
    debouncedParse(text);
    return () => debouncedParse.cancel();
  }, [text, debouncedParse]);
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={MdComponent}
    >
      {parsedComment}
    </Markdown>
  );
};
