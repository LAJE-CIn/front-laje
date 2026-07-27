import PaginaFeed from '@/components/pages/PáginaFeed';
import Header from '@/components/shared/Header';
import { getJogos } from '@/lib/content';

// Página de eventos
export default async function JogosPage() {
  const content = await getJogos();
  const categorias = Array.from(new Set(content.map((evento) => evento.tipo)));

  return (
    <>
      <Header selected="repositorio" />
      <PaginaFeed
        nome="jogos"
        posts={content}
        categorias={categorias}
        basePath="/repositorio/jogos"
      />
    </>
  );
}
