'use server';

import { getEventosOrdenados } from '@/lib/content';
import PaginaFeed from '@/components/pages/PáginaFeed';

export default async function ColecoesPage() {
  const content = await getEventosOrdenados();
  const categoriasSorted = Array.from(
    new Set(content.map((colecao) => colecao.tipo))
  ).sort();
  const tiposBusca = ['Nome'];

  return (
    <PaginaFeed
      nome="Coleções"
      tipos={tiposBusca}
      posts={content}
      categorias={categoriasSorted}
      basePath="/repositorio/colecoes"
    />
  );
}
