import PaginaFeed from '@/components/pages/PáginaFeed';

export default function EventoPage() {
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
      tipo: 'Jogos de IP',
      dataPublicacao: '2026-02-15'
    },
    {
      slug: 'faceshifter',
      nome: 'Faceshifter',
      cover: 'https://picsum.photos/300/200?random=3',
      tipo: 'Outros',
      dataPublicacao: '2026-04-10'
    },
    {
      slug: 'hub-inteligente',
      nome: 'Hub Inteligente',
      cover: 'https://picsum.photos/300/200?random=4',
      tipo: 'GameJams',
      dataPublicacao: '2026-03-05'
    },
    {
      slug: 'global-game-jam',
      nome: 'Global Game Jam',
      cover: 'https://picsum.photos/300/200?random=5',
      tipo: 'GameJams',
      dataPublicacao: '2026-04-01'
    },
    {
      slug: 'laje-kickoff',
      nome: 'LAJE Kickoff',
      cover: 'https://picsum.photos/300/200?random=6',
      tipo: 'Outros',
      dataPublicacao: '2025-12-01'
    },
    {
      slug: 'persona-3',
      nome: 'Persona 3',
      cover: 'https://picsum.photos/300/200?random=7',
      tipo: 'Jogos de IP',
      dataPublicacao: '2025-12-10'
    },
    {
      slug: 'pixel-rain',
      nome: 'Pixel Rain',
      cover: 'https://picsum.photos/300/200?random=8',
      tipo: 'GameJams',
      dataPublicacao: '2026-05-02'
    },
    {
      slug: 'nova-aurora',
      nome: 'Nova Aurora',
      cover: 'https://picsum.photos/300/200?random=9',
      tipo: 'Outros',
      dataPublicacao: '2026-05-10'
    },
    {
      slug: 'ghost-studio',
      nome: 'Ghost Studio',
      cover: 'https://picsum.photos/300/200?random=10',
      tipo: 'Jogos de IP',
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
      tipo: 'Outros',
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
      tipo: 'GameJams',
      dataPublicacao: '2026-08-01'
    },
    {
      slug: 'retro-quest',
      nome: 'Retro Quest',
      cover: 'https://picsum.photos/300/200?random=15',
      tipo: 'Outros',
      dataPublicacao: '2026-08-15'
    }
  ];

  const categorias = [
    'GameJams',
    'Processos Seletivos',
    'Jogos de IP',
    'Outros'
  ];

  return (
    <PaginaFeed
      nome="Eventos"
      posts={content}
      categorias={categorias}
      basePath="/repositorio/eventos"
    />
  );
}
