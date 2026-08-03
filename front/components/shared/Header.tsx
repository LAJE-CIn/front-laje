// Importações

import Link from 'next/link';

// Componente Header

interface HeaderProps {
  selected: 'inicio' | 'noticias' | 'repositorio' | 'artigos';
}

export default function Header({ selected }: HeaderProps) {
  const getLinkStyle = (path: string) => {
    const isActive = selected === path;
    return `
      text-xl font-bold tracking-wide pb-1 border-b-4 transition-all duration-200 ease-in-out
      ${
        isActive
          ? 'border-green-500 text-green-300'
          : 'border-transparent text-green-200 hover:border-green-300/50 hover:text-green-500'
      }
    `;
  };

  return (
    <nav className="bg-linear-to-b from-green-300/90 from-50% via-green-300/70 via-80% to-transparent text-green-300 p-5 fixed w-full z-10">
      <div className="flex justify-between items-start text-center">
        {/* Parte Esquerda */}
        <div className="flex-1 flex justify-around h-14 relative z-0 items-center clip-lateral-esq -mr-11  bg-gray-900">
          <Link href={'/'} className={getLinkStyle('inicio')}>
            Início
          </Link>
          <Link href={'/noticias'} className={getLinkStyle('noticias')}>
            Notícias
          </Link>
        </div>

        {/* Parte da Imagem */}

        <div className="shrink-0 flex flex-col items-center relative z-10">
          <div className="w-100 h-20 clip-trapezio bg-linear-to-b bg-gray-900 flex justify-center items-center">
            <div
              className="w-15 h-15 bg-green-300 mask-centro"
              style={{
                maskImage: `url('/icon.png')`,
                WebkitMaskImage: `url('/icon.png')`
              }}
            />
          </div>
        </div>

        {/* Parte da Direita */}

        <div className="flex-1 h-14 relative z-0 flex justify-around items-center -ml-11  clip-lateral-dir bg-gray-900">
          <Link href={'/artigos'} className={getLinkStyle('artigos')}>
            Artigos
          </Link>
          <Link href={'/repositorio'} className={getLinkStyle('repositorio')}>
            Repositório
          </Link>
        </div>
      </div>
    </nav>
  );
}
