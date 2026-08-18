// Importações

import { Search, ListFilter, Calendar, BookA } from 'lucide-react';
import Select from 'react-select';

// Componente de Filtro

interface FilterBoxProps {
  texto: string;
  recente: boolean;
  selecionado: string;
  onClickList: () => void;
  onChangePesquisa: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelecionado: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterBox({
  texto,
  recente,
  selecionado,
  onClickList,
  onChangePesquisa,
  onChangeSelecionado
}: FilterBoxProps) {
  const opçõesOrdem = [
    { value: 'Data - Mais recentes', label: 'Data - Mais recentes' },
    { value: 'Data - Mais antigos', label: 'Data - Mais antigos' },
    { value: 'Nome - A a Z', label: 'Nome - A a Z' },
    { value: 'Nome - Z a A', label: 'Nome - Z a A' }
  ];

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Container de Busca */}
      <div className="flex flex-1 items-center gap-3 bg-white/60 border-2 border-black rounded-full px-4 py-2 max-w-md">
        <Search className="text-black" size={20} />
        <input
          type="text"
          value={texto}
          onChange={onChangePesquisa}
          placeholder="Buscar por nome..."
          className="w-full bg-transparent focus:outline-none text-black placeholder:opacity-0 md:placeholder:opacity-100  placeholder:text-gray-600"
        />
      </div>

      {/* Botão de Ordenação */}
      <button
        onClick={onClickList}
        className="flex items-center gap-2 cursor-pointer transition-opacity"
        aria-label="Alternar ordem de exibição"
      >
        <ListFilter
          className={recente ? 'text-black' : 'text-blue-500'}
          size={24}
        />
        <span
          className={`text-[15px] md:text-xl md:font-medium ${recente ? 'text-black' : 'text-blue-500'}`}
        >
          {recente ? 'Mais recentes' : 'Mais antigos'}
        </span>
      </button>

      {/* Lista de ordenação */}

      <div className="flex items-center hover:cursor-pointer gap-2">
        {selecionado.includes('Data') ? (
          <Calendar className="text-black" size={24} />
        ) : (
          <BookA className="text-black" size={24} />
        )}

        <Select options={opçõesOrdem} className="z-10" />
      </div>

      {/* Lista de categorias */}
      <Select isMulti options={opçõesOrdem} isClearable={true} />
    </div>
  );
}
