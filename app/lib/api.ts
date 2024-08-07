import { allPosts } from 'contentlayer/generated'

export async function getAllPosts() {
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug)
}

export async function getAllTags() {
  const tags = allPosts.flatMap(post => post.tags || [])
  return Array.from(new Set(tags))
}

export async function getAllCategories() {
  const categories = allPosts.map(post => post.category)
  return Array.from(new Set(categories))
}