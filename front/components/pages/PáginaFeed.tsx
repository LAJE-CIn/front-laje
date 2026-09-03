'use client';

// Importações
import { Conteudo } from '@/lib/content';
import ContentContainer from '../shared/ContentContainer';
import FilterBox from '../shared/FilterBox';
import BotãoVoltar from '../ui/BotãoVoltar';
import { useState } from 'react';
import { SingleValue, MultiValue } from 'react-select';

// Tipo para opções do react-select
type Option = {
  value: string;
  label: string;
};

// Layout de página de Feed (eventos e jogos)

interface PaginaFeedProps {
  nome: string;
  posts: Conteudo[];
  tipos: string[];
  categorias: string[];
  basePath: string;
}

export default function PaginaFeed({
  nome,
  posts,
  tipos,
  categorias,
  basePath
}: PaginaFeedProps) {
  // Opções de filtro
  const [pesquisa, setPesquisa] = useState<string>('');
  const [tipo, setTipo] = useState<string>('Nome');
  const [ordem, setOrdem] = useState<string>('Data - Mais recentes');
  const [selecionados, setSelecionados] = useState<string[]>([]);

  let postsFiltrados = [...posts];

  // Busca por pesquisa

  if (pesquisa) {
    postsFiltrados = postsFiltrados.filter((post) => {
      if (tipo === 'Nome') {
        return post.nome.toLowerCase().includes(pesquisa) ?? false;
      }

      if (tipo === 'Engine' && 'engine' in post) {
        return post.engine?.toLowerCase().includes(pesquisa) ?? false;
      }

      if (tipo === 'Autor' && 'authors' in post) {
        return (
          post.authors?.find((elem) => elem.toLowerCase().includes(pesquisa)) ??
          false
        );
      }

      return false;
    });
  }

  // Busca por categoria
  const categoriasFiltradas =
    selecionados.length > 0
      ? categorias.filter((categoria) => selecionados.includes(categoria))
      : categorias;

  // Ordenação da busca (nome ou data)

  const inverso = ordem.includes('antigos') || ordem.includes('Z a A');

  if (ordem.includes('Data')) {
    postsFiltrados.sort((a, b) => {
      const dataA = new Date(a.dataPublicacao || 0).getTime();
      const dataB = new Date(b.dataPublicacao || 0).getTime();
      return inverso ? dataB - dataA : dataA - dataB;
    });
  }

  if (ordem.includes('Nome')) {
    postsFiltrados.sort((a, b) => {
      const nomeA = a.nome.toLowerCase();
      const nomeB = b.nome.toLocaleLowerCase();
      return inverso ? nomeB.localeCompare(nomeA) : nomeA.localeCompare(nomeB);
    });
  }

  // Props de filtro

  const mudarPesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value.toLowerCase());
  };

  const mudarTipoPesquisa = (newValue: SingleValue<Option>) => {
    setTipo(newValue ? newValue.value : '');
  };

  const mudarOrdemSelecionada = (newValue: SingleValue<Option>) => {
    setOrdem(newValue ? newValue.value : '');
  };

  const mudarCategoriaSelecionada = (newValue: MultiValue<Option>) => {
    const valores = newValue.map((opcao) => opcao.value);
    setSelecionados(valores);
  };

  const containerPorCategoria = Object.groupBy(
    postsFiltrados,
    (post) => post.tipo
  );

  const categoriasParaRenderizar = categoriasFiltradas.filter(
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
          tipos={tipos}
          tipoSelecionado={tipo}
          ordemSelecionado={ordem}
          categorias={categorias}
          categoriasSelecionado={selecionados}
          onChangePesquisa={mudarPesquisa}
          onChangeTipo={mudarTipoPesquisa}
          onChangeOrdem={mudarOrdemSelecionada}
          onChangeSelecionado={mudarCategoriaSelecionada}
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
