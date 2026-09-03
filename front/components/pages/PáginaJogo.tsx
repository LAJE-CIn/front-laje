// Importações

import Image from 'next/image';
import BotãoVoltar from '../ui/BotãoVoltar';
import { MDXContent } from '../shared/mdx-content';
import type { Jogo } from '#site/content';

// Layout de página de detalhe de um jogo (capa + corpo)

interface PaginaJogoProps {
  jogo: Jogo;
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

export default function PaginaJogo({ jogo, basePath }: PaginaJogoProps) {
  return (
    <div className="flex flex-col gap-5 m-4 pt-28 sm:pt-36">
      {/* Breadcrumb e botão de voltar */}

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-black tracking-wide">Jogos</p>
        <BotãoVoltar path={basePath} />
      </div>

      {/* Título do jogo */}

      <h1 className="text-5xl font-bold text-black tracking-wide">
        {jogo.nome}
      </h1>

      {/* Capa + corpo */}

      <div className="flex flex-col md:flex-row gap-6 border-2 border-black bg-white/50 rounded-xs p-6 shadow-2xl">
        {/* Capa e informações */}
        <div className="flex flex-col gap-6 ">
          <Image
            src={jogo.imagem}
            alt={`Capa do jogo ${jogo.nome}`}
            loading="eager"
            width={320}
            height={208}
            className="w-full md:w-80 h-52 object-cover border-2 border-black rounded-xs shrink-0"
          />

          <div className="flex flex-col gap-2 text-black font-medium text-lg md:text-xl">
            <h2 className="text-xl md:text-3xl font-bold mb-1">
              Detalhes do projeto:
            </h2>

            {jogo.authors && jogo.authors.length > 0 && (
              <p className="w-80 max-w-lg text-justify leading-relaxed wrap-break-word">
                <span className="font-semibold">Autores:</span>{' '}
                {jogo.authors.join(', ')}
              </p>
            )}

            <p className="w-full wrap-break-word">
              <span className="font-semibold">Gênero:</span> {jogo.tipo}
            </p>

            {jogo.engine && (
              <p className="w-full wrap-break-word">
                <span className="font-semibold">Engine:</span> {jogo.engine}
              </p>
            )}
          </div>
        </div>

        {/* Corpo: descrição + informações + selo do itch.io */}
        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-3">
            <MDXContent code={jogo.body} components={mdxComponents} />
          </div>

          <hr />

          <h2 className="text-xl md:text-2xl">Disponível em:</h2>

          {jogo.link && (
            <iframe
              src="https://itch.io/embed/3064138"
              className="max-w-250 h-42 w-full"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
