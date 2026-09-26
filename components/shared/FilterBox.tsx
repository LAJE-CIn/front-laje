// Importações

import { Search, Calendar, BookA, ListTodo, Pencil } from 'lucide-react';
import Select, { ActionMeta } from 'react-select';

// Tipo para opções do react-select
type Option = {
  value: string;
  label: string;
};

// Componente de Filtro

interface FilterBoxProps {
  texto: string;
  tipos: string[];
  tipoSelecionado: string;
  ordemSelecionado: string;
  categorias: string[];
  categoriasSelecionado: string[];
  onChangePesquisa: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTipo: (option: Option | null, actionMeta: ActionMeta<Option>) => void;
  onChangeOrdem: (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => void;
  onChangeSelecionado: (
    option: readonly Option[],
    actionMeta: ActionMeta<Option>
  ) => void;
}

export default function FilterBox({
  texto,
  tipos,
  tipoSelecionado,
  ordemSelecionado,
  categorias,
  categoriasSelecionado,
  onChangePesquisa,
  onChangeTipo,
  onChangeOrdem,
  onChangeSelecionado
}: FilterBoxProps) {
  const opçõesOrdem = [
    { value: 'Data - Mais recentes', label: 'Data - Mais recentes' },
    { value: 'Data - Mais antigos', label: 'Data - Mais antigos' },
    { value: 'Nome - A a Z', label: 'Nome - A a Z' },
    { value: 'Nome - Z a A', label: 'Nome - Z a A' }
  ];

  const opçõesTipos = tipos.map((tipo) => ({
    value: tipo,
    label: tipo
  }));

  const opçõesCategorias = categorias.map((categoria) => ({
    value: categoria,
    label: categoria
  }));

  const tipoOption = {
    value: tipoSelecionado,
    label: tipoSelecionado
  };

  const ordemOption = {
    value: ordemSelecionado,
    label: ordemSelecionado
  };

  const categoriasOptions = categoriasSelecionado.map((categoria) => ({
    value: categoria,
    label: categoria
  }));

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Container de Busca */}
      <div className="flex flex-1 items-center gap-3 bg-white/60 border-2 border-black rounded-full px-4 py-2 max-w-md">
        <Search className="text-black" size={20} />
        <input
          type="text"
          value={texto}
          onChange={onChangePesquisa}
          placeholder={`Buscar por ${tipoSelecionado.toLowerCase()}`}
          className="w-full bg-transparent focus:outline-none text-black placeholder:opacity-0 md:placeholder:opacity-100  placeholder:text-gray-600"
        />
      </div>

      {/* Alterar filtro da busca */}

      <div className="flex flex-col md:flex-row gap-7">
        <div className="flex items-center hover:cursor-pointer gap-2">
          <Pencil className="text-black" size={24} />

          <Select
            value={tipoOption}
            options={opçõesTipos}
            onChange={onChangeTipo}
            className="z-9"
          />
        </div>

        {/* Lista de ordenação */}

        <div className="flex items-center hover:cursor-pointer gap-2">
          {ordemOption?.value.includes('Data') ? (
            <Calendar className="text-black" size={24} />
          ) : (
            <BookA className="text-black" size={24} />
          )}

          <Select
            value={ordemOption}
            options={opçõesOrdem}
            onChange={onChangeOrdem}
            className="z-8"
          />
        </div>

        {/* Lista de categorias */}

        <div className="flex items-center hover:cursor-pointer gap-2">
          <ListTodo className="text-black" size={24} />

          <Select
            isMulti
            value={categoriasOptions}
            options={opçõesCategorias}
            isClearable={true}
            placeholder="Selecione categorias..."
            className="z-7"
            onChange={onChangeSelecionado}
          />
        </div>
      </div>
    </div>
  );
}
