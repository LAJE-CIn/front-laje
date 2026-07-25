// Importações

import PaginaFeed from '@/components/pages/PáginaFeed';
import Header from '@/components/shared/Header';

// Página de eventos

export default function EventosPage() {
  //mock temporario
  const content = [
    {
      slug: 'beach-invaders',
      nome: 'Beach Invaders',
      cover: 'https://picsum.photos/300/200?random=1',
      tipo: 'GameJams',
      dataPublicacao: '2026-01-20'
    },
    {
      slug: 'cybershop-ecommerce',
      nome: 'CyberShop',
      cover: 'https://picsum.photos/300/200?random=2',
      tipo: 'Processos Seletivos',
      dataPublicacao: '2026-02-15'
    },
    {
      slug: 'faceshifter',
      nome: 'Faceshifter',
      cover: 'https://picsum.photos/300/200?random=3',
      tipo: 'Jogos de IP',
      dataPublicacao: '2026-04-10'
    },
    {
      slug: 'hub-inteligente',
      nome: 'Hub Inteligente',
      cover: 'https://picsum.photos/300/200?random=4',
      tipo: 'Eventos',
      dataPublicacao: '2026-03-05'
    },
    {
      slug: 'global-game-jam',
      nome: 'Global Game Jam',
      cover: 'https://picsum.photos/300/200?random=5',
      tipo: 'Outros',
      dataPublicacao: '2026-04-01'
    },
    {
      slug: 'laje-kickoff',
      nome: 'LAJE Kickoff',
      cover: 'https://picsum.photos/300/200?random=6',
      tipo: 'GameJams',
      dataPublicacao: '2025-12-01'
    },
    {
      slug: 'persona-3',
      nome: 'Persona 3',
      cover: 'https://picsum.photos/300/200?random=7',
      tipo: 'Processos Seletivos',
      dataPublicacao: '2025-12-10'
    },
    {
      slug: 'pixel-rain',
      nome: 'Pixel Rain',
      cover: 'https://picsum.photos/300/200?random=8',
      tipo: 'Jogos de IP',
      dataPublicacao: '2026-05-02'
    },
    {
      slug: 'nova-aurora',
      nome: 'Nova Aurora',
      cover: 'https://picsum.photos/300/200?random=9',
      tipo: 'Eventos',
      dataPublicacao: '2026-05-10'
    },
    {
      slug: 'ghost-studio',
      nome: 'Ghost Studio',
      cover: 'https://picsum.photos/300/200?random=10',
      tipo: 'Outros',
      dataPublicacao: '2026-06-01'
    },
    {
      slug: 'arcade-sky',
      nome: 'Arcade Sky',
      cover: 'https://picsum.photos/300/200?random=11',
      tipo: 'GameJams',
      dataPublicacao: '2026-06-12'
    },
    {
      slug: 'neon-ritual',
      nome: 'Neon Ritual',
      cover: 'https://picsum.photos/300/200?random=12',
      tipo: 'Processos Seletivos',
      dataPublicacao: '2026-07-03'
    },
    {
      slug: 'echo-lab',
      nome: 'Echo Lab',
      cover: 'https://picsum.photos/300/200?random=13',
      tipo: 'Jogos de IP',
      dataPublicacao: '2026-07-14'
    },
    {
      slug: 'mundo-cinza',
      nome: 'Mundo Cinza',
      cover: 'https://picsum.photos/300/200?random=14',
      tipo: 'Eventos',
      dataPublicacao: '2026-08-01'
    },
    {
      slug: 'retro-quest',
      nome: 'Retro Quest',
      cover: 'https://picsum.photos/300/200?random=15',
      tipo: 'Outros',
      dataPublicacao: '2026-08-15'
    },
    {
      slug: 'pixel-echo',
      nome: 'Pixel Echo',
      cover: 'https://picsum.photos/300/200?random=16',
      tipo: 'GameJams',
      dataPublicacao: '2026-08-20'
    },
    {
      slug: 'midnight-run',
      nome: 'Midnight Run',
      cover: 'https://picsum.photos/300/200?random=17',
      tipo: 'GameJams',
      dataPublicacao: '2026-08-25'
    },
    {
      slug: 'starfall-lab',
      nome: 'Starfall Lab',
      cover: 'https://picsum.photos/300/200?random=18',
      tipo: 'GameJams',
      dataPublicacao: '2026-09-01'
    },
    {
      slug: 'nova-signal',
      nome: 'Nova Signal',
      cover: 'https://picsum.photos/300/200?random=19',
      tipo: 'GameJams',
      dataPublicacao: '2026-09-05'
    },
    {
      slug: 'loop-atelier',
      nome: 'Loop Atelier',
      cover: 'https://picsum.photos/300/200?random=20',
      tipo: 'GameJams',
      dataPublicacao: '2026-09-10'
    }
  ];

  const categorias = [
    'GameJams',
    'Processos Seletivos',
    'Jogos de IP',
    'Eventos',
    'Outros'
  ];

  return (
    <>
      <Header selected="repositorio" />
      <PaginaFeed
        nome="Coleções"
        posts={content}
        categorias={categorias}
        basePath="/repositorio/colecoes"
      />
    </>
  );
}
