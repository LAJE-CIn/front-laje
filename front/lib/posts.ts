// Importações

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Posts from '@/lib/schemas/posts.interface';

// Configuração

const eventosDir = path.join(process.cwd(), './front/contents/eventos');
const jogosDir = path.join(process.cwd(), './front/contents/jogos');

function getAllContents(contentDir: string): Posts[] {
  const fileNames = fs.readdirSync(contentDir);

  return fileNames.map((file) => {
    const fullPath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);
    const slug = file.replace(/\.md$/, '');

    return {
      slug,
      ...data
    } as Posts;
  });
}

function getContent(contentDir: string, slug: string): Posts {
  const fullPath = path.join(contentDir, `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data
  } as Posts;
}

// Métodos

export function getAllEvents(): Posts[] {
  return getAllContents(eventosDir);
}

export function getEvento(slug: string) {
  return getContent(eventosDir, slug);
}

export function getAllJogos(): Posts[] {
  return getAllContents(jogosDir);
}

export function getJogo(slug: string) {
  return getContent(jogosDir, slug);
}
