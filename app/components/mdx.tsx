'use client';

// @ts-nocheck
import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXRemote } from 'next-mdx-remote';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const TableOfContents = dynamic(() => import('./TableOfContents'), {
  ssr: false,
});

// ScrollToAnchor 컴포넌트 삭제

// 컴포넌트 정의
const generateId = (text: React.ReactNode): string => {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/[^\w]+/g, '-');
  } else if (Array.isArray(text)) {
    return text.map(item => generateId(item)).join('-');
  } else if (React.isValidElement(text)) {
    return generateId(text.props.children);
  } else {
    return '';
  }
};

const createHeadingComponent = (level: number) => {
  return ({ children, ...props }: any) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const id = typeof children === 'string' ? generateId(children) : '';
    
    return (
      <Tag id={id} {...props}>
        {id ? (
          <a href={`#${id}`} className="anchor-link">
            {children}
          </a>
        ) : children}
      </Tag>
    );
  };
};

const components = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
  a: ({ className, ...props }) => (
    <a
      className={clsx(
        "font-medium text-purple-300 underline underline-offset-4 hover:text-purple-400",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={clsx("leading-7 text-white [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={clsx("my-6 ml-6 list-disc text-white", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={clsx("my-6 ml-6 list-decimal text-white", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={clsx("mt-2 text-white", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={clsx(
        "mt-6 border-l-2 border-purple-300 pl-6 italic text-purple-200",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx("rounded-md", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-zinc-800 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={clsx("w-full text-white", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx(
        "m-0 border-t border-zinc-800 p-0 even:bg-zinc-900",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={clsx(
        "border border-zinc-800 px-4 py-2 text-left font-bold text-white [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={clsx(
        "border border-zinc-800 px-4 py-2 text-left text-white [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={clsx(
        "mt-6 overflow-x-auto rounded-lg bg-zinc-900 py-4 px-4",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={clsx(
        "relative rounded bg-zinc-800 py-[0.2rem] px-[0.3rem] font-mono text-sm text-purple-300",
        className,
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={clsx(
        "font-bold text-purple-300",
        className
      )}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const extractedHeadings = Array.from(headingElements).map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
      }));
      setHeadings(extractedHeadings);
    };

    extractHeadings();
  }, [code]);

  return (
    <div className="mdx relative">
      <style jsx global>{styles}</style>
      {headings.length > 0 && <TableOfContents headings={headings} />}
      <Component components={components} />
    </div>
  );
}

export const MdxRemote = ({ source }) => {
  return (
    <>
      <MDXRemote
        {...source}
        components={components}
      />
    </>
  );
};

function clsx(...args: any) {
  return args.filter(Boolean).join(" ");
}

const styles = `
  .anchor-link {
    color: inherit;
    text-decoration: none;
  }
  .anchor-link:hover {
    text-decoration: underline;
  }
`;