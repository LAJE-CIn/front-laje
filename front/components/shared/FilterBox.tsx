// Importações

import { Search, ListFilter } from 'lucide-react';

// Componente de Filtro

interface FilterBoxProps {
  texto: string;
  recente: boolean;
  onClickList: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterBox({
  texto,
  recente,
  onClickList,
  onChange
}: FilterBoxProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Container de Busca */}
      <div className="flex flex-1 items-center gap-3 bg-white/60 border-2 border-black rounded-full px-4 py-2 max-w-md">
        <Search className="text-black" size={20} />
        <input
          type="text"
          value={texto}
          onChange={onChange}
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
    </div>
  );
}
