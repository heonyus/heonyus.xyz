import { getPostBySlug } from '../../lib/api';
import { MDXRemote } from 'next-mdx-remote';
import TableOfContents from '../../components/TableOfContents';

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div className="container mx-auto px-4 flex">
      <aside className="w-1/4">
        <TableOfContents content={post.content} />
      </aside>
      <article className="w-3/4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <MDXRemote {...post.content} />
      </article>
    </div>
  );
}