// Importações

import Link from 'next/link';
import Image from 'next/image';
import Laje from '../../app/icon.png';

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
          ? 'border-black text-black'
          : 'border-transparent text-gray-700 hover:border-black/50 hover:text-black'
      }
    `;
  };

  return (
    <nav
      className="bg-linear-to-b from-green-300/90 from-50% via-green-300/70 via-80% to-transparent
                 flex justify-between items-center text-center"
    >
      {/* Parte Esquerda */}
      <div className="flex-1 flex justify-around items-center">
        <Link href={'/'} className={getLinkStyle('inicio')}>
          Início
        </Link>
        <Link href={'/noticias'} className={getLinkStyle('noticias')}>
          Notícias
        </Link>
      </div>

      {/* Parte da Imagem */}

      <div className="shrink-0 flex flex-col items-center">
        <div className="w-71 h-50 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-linear-to-b from-gray-900 via-gray-600/50 to-transparent flex justify-center pt-4">
          <Image
            src={Laje}
            alt="Logo da Laje"
            className="max-w-40 h-25 object-contain"
          />
        </div>
      </div>

      {/* Parte da Direita */}

      <div className="flex-1 flex justify-around items-center">
        <Link href={'/repositorio'} className={getLinkStyle('repositorio')}>
          Repositório
        </Link>
        <Link href={'/artigos'} className={getLinkStyle('artigos')}>
          Artigos
        </Link>
      </div>
    </nav>
  );
}
