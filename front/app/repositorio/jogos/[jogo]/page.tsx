// Importações

import { notFound } from 'next/navigation';
import { getJogo } from '@/lib/content';
import Header from '@/components/shared/Header';
import PaginaJogo from '@/components/pages/PáginaJogo';

// Página de detalhe de um jogo

export default async function JogoPage({
  params
}: {
  params: Promise<{ jogo: string }>;
}) {
  const { jogo: slug } = await params;
  const jogo = await getJogo(slug, true);

  if (!jogo) {
    notFound();
  }

  return (
    <>
      <Header selected="repositorio" />
      <PaginaJogo jogo={jogo} basePath="/repositorio/jogos" />
    </>
  );
}
