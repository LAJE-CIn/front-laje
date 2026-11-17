// Importações

import Image from 'next/image';
import PlaceholderTBD from '../ui/PlaceholderTBD';
import BotãoVoltar from '../ui/BotãoVoltar';
import { MDXContent } from '../shared/mdx-content';
import PageContainer from '../shared/PageContainer';
import type { Jogo } from '#site/content';

// Layout de página de detalhe de um jogo (capa + corpo)

interface PaginaJogoProps {
  jogo: Jogo;
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

export default function PaginaJogo({ jogo }: PaginaJogoProps) {
  return (
    <PageContainer className="flex flex-col gap-5">
      {/* Breadcrumb e botão de voltar */}

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-black tracking-wide">Jogos</p>
        <BotãoVoltar />
      </div>

      {/* Título do jogo */}

      <h1 className="text-5xl font-bold text-black tracking-wide">
        {jogo.nome}
      </h1>

      {/* Capa + corpo */}

      <div className="flex flex-col md:flex-row gap-6 border-2 border-black bg-white/50 rounded-xs p-6 shadow-2xl">
        {/* Capa e informações */}
        <div className="flex flex-col gap-6 ">
          {jogo.imagem &&
            jogo.imagem.trim() !== '' &&
            !jogo.imagem.includes('/assets/mock/') ? (
            <Image
              src={jogo.imagem}
              alt={`Capa do jogo ${jogo.nome}`}
              loading="eager"
              width={320}
              height={208}
              className="w-full md:w-80 h-52 object-cover border-2 border-black rounded-xs shrink-0"
            />
          ) : (
            <div className="w-full md:w-80 h-52 border-2 border-black rounded-xs shrink-0 overflow-hidden">
              <PlaceholderTBD seed={jogo.slug || jogo.nome} />
            </div>
          )}

          <div className="flex flex-col gap-2 text-black font-medium text-lg md:text-xl">
            <h2 className="text-xl md:text-3xl font-bold mb-1">
              Detalhes do projeto:
            </h2>

            {jogo.authors && jogo.authors.length > 0 && (
              <p className="max-w-sm text-justify leading-relaxed wrap-break-word">
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

          {(() => {
            const githubLink =
              jogo.github || (jogo.repo === 'git' ? jogo.link : '');
            const itchLink =
              jogo.itch || (jogo.repo === 'itch' ? jogo.link : '');
            const hasAnyRepo = Boolean(githubLink || itchLink);

            if (!hasAnyRepo) {
              return (
                <div className="max-w-250 w-full rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30 p-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Não há nenhum repositório público disponível para este jogo.
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-3">
                {githubLink && (() => {
                  const isFullUrl = githubLink.startsWith('http');
                  const repoUrl = isFullUrl
                    ? githubLink
                    : `https://github.com/${githubLink}`;
                  const repoPath = githubLink.replace(
                    /^https?:\/\/(www\.)?github\.com\//,
                    ''
                  );

                  return (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 max-w-250 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 transition-all hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-current"
                            aria-hidden="true"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Repositório GitHub
                          </p>
                          <p className="truncate font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                            {repoPath}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-transform group-hover:translate-x-0.5">
                        Acessar →
                      </span>
                    </a>
                  );
                })()}

                {itchLink && (
                  <a
                    href={itchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 max-w-250 w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 transition-all hover:border-[#FA5C5C]/60 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FA5C5C] text-white">
                        <svg
                          viewBox="0 0 245.37069 220.73612"
                          className="h-5 w-5 fill-current"
                          aria-hidden="true"
                        >
                          <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056 0 122.685 0c-34.37 0-81.974.197-90.695 1.365zm69.307 79.354c-11.157.001-19.538 7.515-21.662 18.084-.014.072-.026.144-.04.216-.872 4.35-1.163 8.95-1.163 13.56v42.996c0 13.45 10.903 24.354 24.354 24.354h41.4c13.45 0 24.354-10.904 24.354-24.354v-42.997c0-4.61-.29-9.21-1.162-13.56a2.31 2.31 0 0 0-.04-.215c-2.125-10.57-10.506-18.084-21.663-18.084H101.297zm-46.84 14.377c-13.997 0-25.344 11.347-25.344 25.344v55.28c0 24.34 19.732 44.072 44.072 44.072h99.002c24.34 0 44.072-19.732 44.072-44.072v-55.28c0-13.997-11.347-25.344-25.344-25.344h-13.063v50.625c0 20.517-16.633 37.15-37.15 37.15H104.67c-20.517 0-37.15-16.633-37.15-37.15V95.096H54.457z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                          itch.io
                        </p>
                        <p className="truncate font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                          {itchLink.replace(/^https?:\/\/(www\.)?/, '')}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition-transform group-hover:translate-x-0.5">
                      Acessar →
                    </span>
                  </a>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </PageContainer>
  );
}
