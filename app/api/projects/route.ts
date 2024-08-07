import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects');
    const filenames = fs.readdirSync(projectsDirectory);

    const projects = filenames.map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace('.mdx', ''),
        frontmatter: {
          ...data,
          date: new Date(data.date).toISOString(),
          tags: data.tags || [],
          image: data.image || '/default-image.jpg',
        },
        content,
      };
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}