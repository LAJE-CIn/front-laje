// Importações

import { getAllJogos, getJogo } from '@/lib/posts';
import Header from '@/components/shared/Header';
import PaginaJogo from '@/components/pages/PáginaJogo';

// Gera as rotas estáticas de cada jogo em tempo de build

export function generateStaticParams() {
  const jogos = getAllJogos();
  return jogos.map((jogo) => ({ jogo: jogo.slug }));
}

// Página de detalhe de um jogo

export default async function JogoPage({
  params
}: {
  params: Promise<{ jogo: string }>;
}) {
  const { jogo: slug } = await params;
  const jogo = getJogo(slug);

  return (
    <>
      <Header selected="repositorio" />
      <PaginaJogo jogo={jogo} basePath="/repositorio/jogos" />
    </>
  );
}
