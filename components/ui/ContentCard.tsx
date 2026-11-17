'use client';

// Importações
import Link from 'next/link';
import { useState } from 'react';
import PlaceholderTBD from './PlaceholderTBD';

// Card para fotos dos jogos/eventos
interface ContentCardProps {
  slug: string;
  cover: string;
  nome: string;
  basePath: string;
}

export default function ContentCard({
  slug,
  cover,
  nome,
  basePath
}: ContentCardProps) {
  const [imgError, setImgError] = useState(false);
  const isMock = cover?.includes('/assets/mock/');
  const showImage = Boolean(cover && cover.trim() !== '' && !isMock && !imgError);

  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group relative flex flex-col justify-end w-full max-w-xs sm:max-w-sm mx-auto h-full min-h-[200px] max-h-[320px] rounded-xl border-2 border-black overflow-hidden transition-all duration-300 ease-in-out active:scale-95 hover:scale-[1.02] hover:cursor-pointer shadow-md hover:shadow-xl"
    >
      {showImage ? (
        <img
          src={cover}
          alt={nome}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <PlaceholderTBD seed={slug || nome} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 opacity-100 lg:opacity-80 lg:group-hover:opacity-100" />

      <p className="relative z-10 p-3 sm:p-4 text-center text-white font-bold text-base sm:text-lg lg:text-xl drop-shadow-md transition-all duration-300">
        {nome}
      </p>
    </Link>
  );
}

