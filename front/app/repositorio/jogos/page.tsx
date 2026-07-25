import PaginaFeed from '@/components/pages/PáginaFeed';
import Header from '@/components/shared/Header';

// Página de eventos
export default function JogosPage() {
  return (
    <>
      <Header selected="repositorio" />
      <PaginaFeed
        nome="jogos"
        posts={[]}
        categorias={[]}
        basePath="/repositorio/jogos"
      />
    </>
  );
}
