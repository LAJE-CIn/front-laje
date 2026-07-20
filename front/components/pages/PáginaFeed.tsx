'use client';

// Importações

import Posts from '@/schemas/posts.interface';
import ContentContainer from '../shared/ContentContainer';
import FilterBox from '../shared/FilterBox';
import BotãoVoltar from '../ui/BotãoVoltar';
import { useState } from 'react';

// Layout de página de Feed (eventos e jogos)

interface PaginaFeedProps {
  nome: string;
  posts: Posts[];
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

  let postsFiltrados = [...posts];

  if (pesquisa) {
    postsFiltrados = postsFiltrados.filter((post) => {
      return post.nome.toLowerCase().includes(pesquisa.toLowerCase());
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
    setPesquisa(e.target.value);
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

      <h1 className="text-5xl font-bold text-black tracking-wide">{nome}</h1>
      <div className="flex justify-between">
        <FilterBox
          texto={pesquisa}
          recente={recente}
          onChange={mudarPesquisa}
          onClickList={mudarOrdem}
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
