// Importações

import PaginaFeed from '@/components/pages/PáginaFeed';
import Header from '@/components/shared/Header';

// Página de eventos

export default function JogosPage() {
  //mock temporario
  const content = [
    {
      slug: 'beach-invaders',
      nome: 'Beach Invaders',
      cover: 'https://picsum.photos/300/200?random=1',
      tipo: 'Plataforma',
      dataPublicacao: '2026-01-20'
    },
    {
      slug: 'cybershop-ecommerce',
      nome: 'CyberShop',
      cover: 'https://picsum.photos/300/200?random=2',
      tipo: 'RPG',
      dataPublicacao: '2026-02-15'
    },
    {
      slug: 'faceshifter',
      nome: 'Faceshifter',
      cover: 'https://picsum.photos/300/200?random=3',
      tipo: 'Hack N Slash',
      dataPublicacao: '2026-04-10'
    },
    {
      slug: 'hub-inteligente',
      nome: 'Hub Inteligente',
      cover: 'https://picsum.photos/300/200?random=4',
      tipo: 'Puzzle',
      dataPublicacao: '2026-03-05'
    },
    {
      slug: 'global-game-jam',
      nome: 'Global Game Jam',
      cover: 'https://picsum.photos/300/200?random=5',
      tipo: 'Corrida',
      dataPublicacao: '2026-04-01'
    },
    {
      slug: 'laje-kickoff',
      nome: 'LAJE Kickoff',
      cover: 'https://picsum.photos/300/200?random=6',
      tipo: 'Plataforma',
      dataPublicacao: '2025-12-01'
    },
    {
      slug: 'persona-3',
      nome: 'Persona 3',
      cover: 'https://picsum.photos/300/200?random=7',
      tipo: 'RPG',
      dataPublicacao: '2025-12-10'
    },
    {
      slug: 'pixel-rain',
      nome: 'Pixel Rain',
      cover: 'https://picsum.photos/300/200?random=8',
      tipo: 'Hack N Slash',
      dataPublicacao: '2026-05-02'
    },
    {
      slug: 'nova-aurora',
      nome: 'Nova Aurora',
      cover: 'https://picsum.photos/300/200?random=9',
      tipo: 'Puzzle',
      dataPublicacao: '2026-05-10'
    },
    {
      slug: 'ghost-studio',
      nome: 'Ghost Studio',
      cover: 'https://picsum.photos/300/200?random=10',
      tipo: 'Corrida',
      dataPublicacao: '2026-06-01'
    },
    {
      slug: 'arcade-sky',
      nome: 'Arcade Sky',
      cover: 'https://picsum.photos/300/200?random=11',
      tipo: 'Plataforma',
      dataPublicacao: '2026-06-12'
    },
    {
      slug: 'neon-ritual',
      nome: 'Neon Ritual',
      cover: 'https://picsum.photos/300/200?random=12',
      tipo: 'RPG',
      dataPublicacao: '2026-07-03'
    },
    {
      slug: 'echo-lab',
      nome: 'Echo Lab',
      cover: 'https://picsum.photos/300/200?random=13',
      tipo: 'Hack N Slash',
      dataPublicacao: '2026-07-14'
    },
    {
      slug: 'mundo-cinza',
      nome: 'Mundo Cinza',
      cover: 'https://picsum.photos/300/200?random=14',
      tipo: 'Puzzle',
      dataPublicacao: '2026-08-01'
    },
    {
      slug: 'retro-quest',
      nome: 'Retro Quest',
      cover: 'https://picsum.photos/300/200?random=15',
      tipo: 'Corrida',
      dataPublicacao: '2026-08-15'
    }
  ];

  const categorias = ['Plataforma', 'RPG', 'Hack N Slash', 'Puzzle', 'Corrida'];

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
