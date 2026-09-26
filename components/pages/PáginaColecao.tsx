'use client';

// Importações

import type { Evento } from '#site/content';
import { useState } from 'react';
import { MDXContent } from '../shared/mdx-content';
import BotãoVoltar from '../ui/BotãoVoltar';
import Image from 'next/image';
import Select from 'react-select';
import { SingleValue } from 'react-select';
import ContentCard from '../ui/ContentCard';

// Tipo para opções do react-select
type Option = {
  value: string;
  label: string;
};
// Configurações

interface PáginaColecaoProps {
  colecao: Evento;
}

const mdxComponents = {
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="text-xl font-medium" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc list-inside ml-4 mb-4 font-medium text-xl"
      {...props}
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li className="mb-1" {...props} />
  )
};

// Configurações de filtro

const opções: Option[] = [
  { value: 'Relevância', label: 'Relevância' },
  { value: 'Nome - A a Z', label: 'Nome - A a Z' },
  { value: 'Nome - Z a A', label: 'Nome - Z a A' }
];

export default function PáginaColecao({ colecao }: PáginaColecaoProps) {
  // Pegar os jogos relacioandos

  const [currentOpção, setCurrentOpção] = useState(opções[0]);

  const changeopção = (opção: SingleValue<Option> | null) => {
    if (opção) setCurrentOpção(opção);
  };

  const jogosOrdenados = [...colecao.jogos].sort((a, b) => {
    if (currentOpção.value === 'Nome - A a Z') {
      return a.nome.localeCompare(b.nome);
    }
    if (currentOpção.value === 'Nome - Z a A') {
      return b.nome.localeCompare(a.nome);
    }
    if (currentOpção.value === 'Relevância') {
      return (
        b.eventos.find(
          (e: { slug: string; relevancia: number }) => e.slug === colecao.slug
        )?.relevancia -
        a.eventos.find(
          (e: { slug: string; relevancia: number }) => e.slug === colecao.slug
        )?.relevancia
      );
    }
  });

  return (
    <div className="flex flex-col gap-5 m-4 pt-28 sm:pt-36">
      {/* Breadcrumb e botão de voltar */}

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-black tracking-wide">Coleções</p>
        <BotãoVoltar />
      </div>

      {/* Título da coleção */}

      <h1 className="text-5xl font-bold text-black tracking-wide">
        {colecao.nome}
      </h1>

      {/* Capa + corpo */}

      <div className="flex flex-col md:flex-row gap-6 border-2 border-black bg-white/50 rounded-xs p-6 shadow-2xl">
        <div className="flex flex-col gap-3">
          <Image
            src={colecao.imagem}
            alt={`Capa do jogo ${colecao.nome}`}
            loading="eager"
            width={320}
            height={208}
            className="w-full md:w-80 h-52 object-cover border-2 border-black rounded-xs shrink-0"
          />

          <h2 className="max-w-md text-xl font-medium text-justify text-black tracking-wide">
            Tipo: {colecao.tipo}
          </h2>

          <h2 className="max-w-md text-xl font-medium text-justify text-black tracking-wide">
            Período:{' '}
            {new Date(colecao.dataPublicacao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
            {colecao.dataFim && (
              <>
                {' '}-{' '}
                {new Date(colecao.dataFim).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </>
            )}
          </h2>
        </div>

        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-3">
            <MDXContent code={colecao.body} components={mdxComponents} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 border-2 border-black bg-white/50 rounded-sm p-6 shadow-2xl">
        <div className="flex flex-row justify-start items-center sm:items-center gap-4">
          <h2 className="text-xl font-medium text-black tracking-wide">
            Ordenar por:
          </h2>
          <Select
            options={opções}
            value={currentOpção}
            onChange={changeopção}
            className="max-w-md"
          />
        </div>

        {/* Grid de Jogos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jogosOrdenados.map((jogo) => (
            <ContentCard
              key={jogo.slug}
              slug={jogo.slug}
              cover={jogo.imagem}
              nome={jogo.nome}
              basePath={'../jogos'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
