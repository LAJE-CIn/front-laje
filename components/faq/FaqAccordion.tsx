'use client';

import { useState, useMemo, type ComponentType } from 'react';
import {
  Search,
  ChevronDown,
  HelpCircle,
  Gamepad2,
  Users,
  FolderGit2,
  Handshake,
  X,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import {
  FAQ_DATA,
  FAQ_CATEGORIES,
  CATEGORY_STYLES,
  normalizeText,
  type FaqCategory
} from './faqData';

const CATEGORY_ICONS: Record<FaqCategory, ComponentType<{ className?: string }>> = {
  'Todas': HelpCircle,
  'Sobre a LAJE': Gamepad2,
  'Participação': Users,
  'Projetos & Jogos': FolderGit2,
  'Parcerias': Handshake
};

export default function FaqAccordion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('Todas');
  const [openItemIds, setOpenItemIds] = useState<string[]>(['o-que-e-a-laje']);

  // Alterna o estado de abertura de um item individual
  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Filtragem de perguntas por categoria e por termo de busca (sem distinção de acentos e multi-termos)
  const filteredQuestions = useMemo(() => {
    const normalizedQuery = normalizeText(searchTerm);
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todas' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (queryTokens.length === 0) return true;

      const searchableText = `${item.question} ${item.answer} ${item.category} ${(item.keywords || []).join(' ')}`;
      const normalizedSearchable = normalizeText(searchableText);

      return queryTokens.every((token) => normalizedSearchable.includes(token));
    });
  }, [searchTerm, selectedCategory]);

  // Expandir todas as perguntas visíveis no momento
  const expandAll = () => {
    setOpenItemIds(filteredQuestions.map((q) => q.id));
  };

  // Recolher todas as perguntas
  const collapseAll = () => {
    setOpenItemIds([]);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Barra de Pesquisa e Controles de Expansão */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-900/90 border-2 border-green-500/40 rounded-2xl p-4 sm:p-5 shadow-xl">
        {/* Campo de Busca */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-5 h-5 text-green-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palavras-chave (ex: entrar, bolsas, IP)..."
            className="w-full pl-11 pr-10 py-2.5 bg-black/60 border border-green-500/30 rounded-xl text-white placeholder-gray-400 font-sans text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Botões Expandir e Recolher */}
        <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
          <button
            type="button"
            onClick={expandAll}
            className="px-3.5 py-2 rounded-lg bg-gray-800 lg:hover:bg-gray-700 text-green-300 border border-green-500/30 lg:hover:border-green-400 transition-all active:opacity-80 lg:active:scale-95 touch-manipulation cursor-pointer shadow-sm [&>*]:pointer-events-none"
          >
            [ + Expandir Tudo ]
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3.5 py-2 rounded-lg bg-gray-800 lg:hover:bg-gray-700 text-gray-300 border border-gray-700 lg:hover:border-gray-500 transition-all active:opacity-80 lg:active:scale-95 touch-manipulation cursor-pointer shadow-sm [&>*]:pointer-events-none"
          >
            [ - Recolher ]
          </button>
        </div>
      </div>

      {/* Abas de Categorias */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FAQ_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id];
          const isActive = selectedCategory === cat.id;
          const count =
            cat.id === 'Todas'
              ? FAQ_DATA.length
              : FAQ_DATA.filter((item) => item.category === cat.id).length;

          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all whitespace-nowrap border cursor-pointer touch-manipulation active:opacity-80 lg:active:opacity-100 [&>*]:pointer-events-none ${
                isActive
                  ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)] font-mono scale-[1.02]'
                  : 'bg-gray-900/90 text-gray-300 border-green-500/20 lg:hover:border-green-500/50 lg:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-black/30 text-black'
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista de Perguntas (Accordion) */}
      <div className="flex flex-col gap-4">
        {filteredQuestions.map((item, index) => {
          const isOpen = openItemIds.includes(item.id);
          const style = CATEGORY_STYLES[item.category];

          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-gray-900/95 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                  : 'bg-gray-900/80 border-green-500/25 lg:hover:border-green-500/60 lg:hover:bg-gray-900'
              }`}
            >
              {/* Botão de Trigger (Nota: usamos apenas spans para respeitar HTML5 válido de button e evitar erro de hidratação) */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 group touch-manipulation active:opacity-80 lg:active:opacity-100 [&>*]:pointer-events-none"
                aria-expanded={isOpen}
              >
                <span className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                  <span
                    className={`font-mono text-xs px-2.5 py-1 rounded-md border w-fit shrink-0 ${style.badge}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-lg md:text-xl font-bold text-white tracking-wide leading-snug">
                    <span className="text-green-400 font-mono mr-2">
                      Q{index + 1}.
                    </span>
                    {item.question}
                  </span>
                </span>

                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'bg-green-500 text-black border-green-400 rotate-180'
                      : 'bg-gray-800 text-green-300 border-green-500/30 lg:group-hover:border-green-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </span>
              </button>

              {/* Corpo da Resposta Expandida */}
              {isOpen && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 border-t border-green-500/10 animate-in fade-in duration-200">
                  <div className="bg-black/40 rounded-xl p-4 md:p-5 border border-green-500/20 text-gray-300 font-sans text-base md:text-lg leading-relaxed mt-2">
                    <span className="text-green-400 font-mono font-bold mr-2 text-sm uppercase">
                      [ RESPOSTA ]
                    </span>
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Estado vazio para busca sem resultados */}
        {filteredQuestions.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-900/90 border-2 border-dashed border-gray-700 rounded-2xl gap-4">
            <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">
              [ 0 RESULTADOS ENCONTRADOS ]
            </span>
            <p className="text-2xl font-bold text-white">
              Nenhuma pergunta correspondente à sua busca
            </p>
            <p className="text-gray-400 font-sans max-w-md">
              Não encontramos nenhuma dúvida com o termo &quot;{searchTerm}&quot;{' '}
              {selectedCategory !== 'Todas' && (
                <>na categoria &quot;{selectedCategory}&quot;</>
              )}
              . Tente outro termo ou limpe os filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-green-500 text-black font-bold font-mono text-sm lg:hover:bg-green-400 transition-colors cursor-pointer touch-manipulation active:opacity-80 [&>*]:pointer-events-none"
            >
              Resetar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Card de Contato / Ainda tem dúvidas */}
      <div className="mt-8 bg-gradient-to-r from-gray-900 via-gray-900 to-green-950/40 border-2 border-green-500/50 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-green-400 font-mono text-xs tracking-widest uppercase">
            [ SUPORTE & CONTATO ]
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            Ainda tem alguma dúvida?
          </p>
          <p className="text-gray-300 font-sans text-sm sm:text-base max-w-xl">
            Nossa equipe está sempre disposta a ajudar. Fale conosco pelo Instagram oficial ou venha nos visitar no Centro de Informática da UFPE!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href="https://www.instagram.com/laje.ufpe/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500 text-black font-bold font-mono text-sm tracking-wide lg:hover:bg-green-400 lg:hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all active:opacity-80 lg:active:scale-95 cursor-pointer touch-manipulation [&>*]:pointer-events-none"
          >
            <span>FALAR NO INSTAGRAM</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/repositorio"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-green-300 font-bold font-mono text-sm tracking-wide border border-green-500/30 lg:hover:border-green-400 lg:hover:bg-gray-750 transition-all active:opacity-80 lg:active:scale-95 cursor-pointer touch-manipulation [&>*]:pointer-events-none"
          >
            <span>VER JOGOS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
