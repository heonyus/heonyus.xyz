import { allPosts } from 'contentlayer/generated'

export async function getAllPosts() {
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug)
}