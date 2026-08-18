'use client';

import { Conteudo } from '@/lib/content';
// Importações
import ContentContainer from '../shared/ContentContainer';
import FilterBox from '../shared/FilterBox';
import BotãoVoltar from '../ui/BotãoVoltar';
import { useState } from 'react';

// Layout de página de Feed (eventos e jogos)

interface PaginaFeedProps {
  nome: string;
  posts: Conteudo[];
  categorias: string[];
  basePath: string;
}

export default function PaginaFeed({
  nome,
  posts,
  categorias,
  basePath
}: PaginaFeedProps) {
  // Opções de filtro
  const [pesquisa, setPesquisa] = useState('');
  const [recente, setRecente] = useState(true);
  const [ordem, setOrdem] = useState('Data - Mais recentes');

  let postsFiltrados = [...posts];

  if (pesquisa) {
    postsFiltrados = postsFiltrados.filter((post) => {
      if (post.nome.toLowerCase().includes(pesquisa)) return true;
      if (post.tipo.toLowerCase().includes(pesquisa)) return true;

      if ('engine' in post) {
        if (post.engine?.toLowerCase().includes(pesquisa)) return true;
        if (
          post.authors?.some((author) =>
            author.toLowerCase().includes(pesquisa)
          )
        )
          return true;
      }

      return false;
    });
  }

  postsFiltrados.sort((a, b) => {
    const dataA = new Date(a.dataPublicacao || 0).getTime();
    const dataB = new Date(b.dataPublicacao || 0).getTime();
    return recente ? dataB - dataA : dataA - dataB;
  });

  // Props de filtro
  const mudarOrdem = () => {
    setRecente(!recente);
  };

  const mudarPesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value.toLowerCase());
  };

  const mudarOrdemSelecionada = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdem(e.target.value);
  };

  const containerPorCategoria = Object.groupBy(
    postsFiltrados,
    (post) => post.tipo
  );

  const categoriasParaRenderizar = categorias.filter(
    (categoria) => containerPorCategoria[categoria] !== undefined
  );

  return (
    <div className="flex flex-col gap-5 m-4">
      {/* Barra de filtro e botão de voltar */}

      <h1 className="text-3xl md:text-5xl font-bold text-black tracking-wide">
        {nome}
      </h1>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <FilterBox
          texto={pesquisa}
          recente={recente}
          selecionado={ordem}
          onChangePesquisa={mudarPesquisa}
          onClickList={mudarOrdem}
          onChangeSelecionado={mudarOrdemSelecionada}
        />

        {pesquisa !== '' && (
          <p className=" font-bold  text-gray-400 text-justify text-xl ">
            * busca ativada
          </p>
        )}

        <BotãoVoltar path={'/repositorio'} />
      </div>

      {/* Container de jogos/eventos separados por categoria */}

      <div className="flex flex-col gap-6">
        {categoriasParaRenderizar.map((nomeCategoria) => (
          <ContentContainer
            key={nomeCategoria}
            titulo={nomeCategoria}
            conteudo={containerPorCategoria[nomeCategoria] || []}
            basePath={basePath}
          />
        ))}
        {categoriasParaRenderizar.length === 0 && (
          <p className="text-center text-gray-500 text-xl font-medium">
            Nenhum projeto encontrado
          </p>
        )}
      </div>
    </div>
  );
}
