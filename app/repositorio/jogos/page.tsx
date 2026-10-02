import PaginaFeed from '@/components/pages/PáginaFeed';
import { getJogos } from '@/lib/content';

// Página de eventos
export default async function JogosPage() {
  const content = await getJogos();
  const categorias = Array.from(new Set(content.map((evento) => evento.tipo)));

  const tiposBusca = ['Nome', 'Engine', 'Autor'];

  return (
    <PaginaFeed
      nome="jogos"
      posts={content}
      tipos={tiposBusca}
      categorias={categorias}
      basePath="/repositorio/jogos"
    />
  );
}
