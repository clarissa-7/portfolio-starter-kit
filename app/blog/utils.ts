// app/blog/utils.ts
import { promises as fs } from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  let metadata: Partial<Metadata> = {};
  let content = fileContent;

  if (match) {
    const frontMatterBlock = match[1];
    content = fileContent.replace(frontmatterRegex, '').trim();
    const frontMatterLines = frontMatterBlock.trim().split('\n');

    frontMatterLines.forEach((line) => {
      const [key, ...valueArr] = line.split(': ');
      if (key && valueArr.length) {
        let value = valueArr.join(': ').trim();
        value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
        metadata[key.trim() as keyof Metadata] = value;
      }
    });
  }

  // Ensure required fields have defaults
  metadata.title = metadata.title || 'Untitled';
  metadata.publishedAt = metadata.publishedAt || new Date().toISOString().split('T')[0];
  metadata.summary = metadata.summary || '';

  return { metadata: metadata as Metadata, content };
}

async function getMDXFiles(dir: string) {
  const files = await fs.readdir(dir);
  return files.filter((file) => path.extname(file) === '.mdx');
}

async function readMDXFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

async function getMDXData(dir: string) {
  const mdxFiles = await getMDXFiles(dir);
  const promises = mdxFiles.map(async (file) => {
    const filePath = path.join(dir, file);
    const { metadata, content } = await readMDXFile(filePath);
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
  return Promise.all(promises);
}

export async function getBlogPosts() {
  try {
    return await getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  let formattedDate = '';
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
