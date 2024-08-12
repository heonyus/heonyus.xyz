import { promises as fs } from 'fs';
import path from 'path';
import BlogPageClient from '../components/BlogPageClient';
import { allPosts } from 'contentlayer/generated';

async function getCategoryStructure() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const categoryStructure: Record<string, string[]> = {};

  try {
    const categories = await fs.readdir(blogDir);
    for (const category of categories) {
      const categoryPath = path.join(blogDir, category);
      const stat = await fs.stat(categoryPath);
      if (stat.isDirectory()) {
        const posts = await fs.readdir(categoryPath);
        categoryStructure[category] = posts.map(post => path.parse(post).name);
      }
    }
    console.log('Category structure:', categoryStructure); // 디버깅용 로그
  } catch (error) {
    console.error('Error reading blog directory:', error);
  }

  return categoryStructure;
}

async function getAllTags() {
  const tags = new Set<string>();
  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}

export default async function BlogPage() {
  const categoryStructure = await getCategoryStructure();
  const initialPosts = allPosts;
  const initialTags = await getAllTags();
  const categories = Object.keys(categoryStructure);

  console.log('BlogPage props:', { 
    initialPostsCount: initialPosts.length, 
    initialTagsCount: initialTags.length, 
    categoriesCount: categories.length 
  });

  return (
    <BlogPageClient
      initialPosts={initialPosts}
      initialTags={initialTags}
      categories={categories}
      categoryStructure={categoryStructure}
    />
  );
}