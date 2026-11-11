// Importações

import { notFound } from 'next/navigation';
import { getEvento } from '@/lib/content';
import PaginaColecao from '@/components/pages/PáginaColecao';

// Página de detalhe de um evento

export default async function EventoPage({
  params
}: {
  params: Promise<{ colecao: string }>;
}) {
  const { colecao: slug } = await params;

  const colecao = await getEvento(slug);

  if (!colecao) {
    notFound();
  }

  return <PaginaColecao colecao={colecao} />;
}
