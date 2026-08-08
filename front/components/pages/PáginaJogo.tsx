// Importações

import Image from 'next/image';
import BotãoVoltar from '../ui/BotãoVoltar';
import { MDXContent } from '../shared/mdx-content';
import ItchBadge from '../ui/ItchBadge';
import type { Jogo } from '#site/content';

// Layout de página de detalhe de um jogo (capa + corpo)

interface PaginaJogoProps {
  jogo: Jogo;
  basePath: string;
}

export default function PaginaJogo({ jogo, basePath }: PaginaJogoProps) {
  return (
    <div className="flex flex-col gap-5 m-4">
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
        {/* Capa */}
        <Image
          src={jogo.imagem}
          alt={`Capa do jogo ${jogo.nome}`}
          loading="eager"
          width={320}
          height={208}
          className="w-full md:w-80 h-52 object-cover border-2 border-black rounded-xs shrink-0"
        />

        {/* Corpo: descrição + informações + selo do itch.io */}
        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-3">
            <MDXContent code={jogo.body} />
            <div className="flex flex-col gap-1 text-black font-medium">
              {jogo.authors && <p>Autores: {jogo.authors}</p>}
              <p>Gênero: {jogo.tipo}</p>
              {jogo.engine && <p>Engine: {jogo.engine}</p>}
            </div>
          </div>

          {jogo.link && (
            <div className="flex justify-end">
              <ItchBadge href={jogo.link} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
