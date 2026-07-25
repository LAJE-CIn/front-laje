'use client';

// Importações

import { useState } from 'react';
import ContentCard from '../ui/ContentCard';
import Posts from '@/lib/schemas/posts.interface';
import CarregarMaisCard from '../ui/CarregarMaisCard';

// Container de conteúdos

interface ContentContainerProps {
  titulo: string;
  conteudo: Posts[];
  basePath: string;
}

export default function ContentContainer({
  titulo,
  conteudo,
  basePath
}: ContentContainerProps) {
  const total = conteudo.length;
  const [current, setCurrent] = useState(4);

  const changeCurrent = () => {
    setCurrent(current + 4);
  };

  const loaded = conteudo.slice(0, current);

  return (
    <div className="flex flex-col justify-center border-2 border-black bg-white/50 rounded-xs p-6 gap-6 shadow-2xl">
      <h1 className="text-3xl font-bold text-black tracking-wide">{titulo}</h1>

      <div className="grid grid-cols-5 justify-center items-center gap-7">
        {loaded.map((element) => (
          <ContentCard
            key={element.slug}
            slug={element.slug}
            cover={element.cover}
            nome={element.nome}
            basePath={basePath}
          />
        ))}
        {loaded.length < total && <CarregarMaisCard onClick={changeCurrent} />}
      </div>
    </div>
  );
}
