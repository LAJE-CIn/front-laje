// Importações

import type { Evento } from '#site/content';
import { MDXContent } from '../shared/mdx-content';
import BotãoVoltar from '../ui/BotãoVoltar';
import Image from 'next/image';
import { Select, SingleValue } from 'react-select';

// Configurações

interface PáginaColecaoProps {
  colecao: Evento;
  basePath: string;
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

export default function PáginaColecao({
  colecao,
  basePath
}: PáginaColecaoProps) {
  return (
    <div className="flex flex-col gap-5 m-4 pt-28 sm:pt-36">
      {/* Breadcrumb e botão de voltar */}

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-black tracking-wide">Coleções</p>
        <BotãoVoltar path={basePath} />
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
            })}{' '}
            -{' '}
            {new Date(colecao.dataFim).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </h2>
        </div>

        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-3">
            <MDXContent code={colecao.body} components={mdxComponents} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 border-2 border-black bg-white/50 rounded-xs p-6 shadow-2xl"></div>
    </div>
  );
}
