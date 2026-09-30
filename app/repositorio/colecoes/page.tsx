'use server';

import { getEventosOrdenados } from '@/lib/content';
// Importações
import PaginaFeed from '@/components/pages/PáginaFeed';
import Header from '@/components/shared/Header';
// Página de eventos

export default async function EventosPage() {
  const content = await getEventosOrdenados();
  const categorias = Array.from(new Set(content.map((evento) => evento.tipo)));

  const categoriasSorted = categorias.sort();

  const tiposBusca = ['Nome'];

  return (
    <>
      <Header selected="repositorio" />
      <PaginaFeed
        nome="Coleções"
        tipos={tiposBusca}
        posts={content}
        categorias={categoriasSorted}
        basePath="/repositorio/colecoes"
      />
    </>
  );
}
