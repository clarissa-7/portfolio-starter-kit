import fs from 'fs';
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
    content = fileContent.replace(frontmatterRegex
