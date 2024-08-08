import { allPosts } from 'contentlayer/generated'

export async function getAllPosts() {
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug || post._raw.flattenedPath === `blog/${slug}`);
}

export async function getAllTags() {
  const tags = allPosts.flatMap(post => post.tags || [])
  return Array.from(new Set(tags))
}

export async function getAllCategories() {
  const categories = allPosts.map(post => post.category)
  return Array.from(new Set(categories))
}

export async function getAdjacentPosts(currentSlug: string) {
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return { prev: null, next: null };

  const sameCategoryPosts = allPosts
    .filter(post => post.category === currentPost.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = sameCategoryPosts.findIndex(post => post.slug === currentSlug);
  const prev = currentIndex < sameCategoryPosts.length - 1 ? sameCategoryPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? sameCategoryPosts[currentIndex - 1] : null;

  return { prev, next };
}