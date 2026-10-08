'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  X,
  FileText,
  BookOpen,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Download,
  Terminal,
  CheckCircle2,
  ChevronDown,
  Layers,
  Mail,
  Gamepad2,
  FolderGit2,
  GraduationCap,
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import {
  PROCEEDINGS_DATA,
  RULES_DATA,
  FORMS_DATA,
  CHANNELS_DATA,
  QUICK_RESOURCES_DATA,
  BOARD_CONTACTS,
  normalizeText,
  type MemberSection
} from './membrosData';

const PROCEEDING_CATEGORIES = [
  { id: 'Todas', label: 'Todas', icon: Terminal },
  { id: 'Desenvolvimento', label: 'Desenvolvimento', icon: Gamepad2 },
  { id: 'Gestão & Sprints', label: 'Gestão & Sprints', icon: Clock },
  { id: 'Infraestrutura', label: 'Infraestrutura', icon: FolderGit2 },
  { id: 'Acadêmico', label: 'Acadêmico', icon: GraduationCap }
] as const;

export default function MembersHub() {
  const [activeTab, setActiveTab] = useState<MemberSection>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProceedingCategory, setSelectedProceedingCategory] = useState<string>('Todas');
  const [expandedProceedingIds, setExpandedProceedingIds] = useState<string[]>([
    'pipeline-desenvolvimento'
  ]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const toggleProceeding = (id: string) => {
    setExpandedProceedingIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtragem Geral com Pesquisa
  const normalizedQuery = normalizeText(searchQuery);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const filteredProceedings = useMemo(() => {
    return PROCEEDINGS_DATA.filter((item) => {
      if (
        selectedProceedingCategory !== 'Todas' &&
        item.category !== selectedProceedingCategory
      ) {
        return false;
      }
      if (queryTokens.length === 0) return true;
      const haystack = normalizeText(
        `${item.title} ${item.description} ${item.steps.join(' ')} ${item.tag} ${item.category} ${item.tips || ''}`
      );
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [selectedProceedingCategory, queryTokens]);

  const filteredRules = useMemo(() => {
    if (queryTokens.length === 0) return RULES_DATA;
    return RULES_DATA.filter((item) => {
      const haystack = normalizeText(
        `${item.title} ${item.summary} ${item.details.join(' ')} ${item.category} ${item.highlight}`
      );
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [queryTokens]);

  const filteredForms = useMemo(() => {
    if (queryTokens.length === 0) return FORMS_DATA;
    return FORMS_DATA.filter((item) => {
      const haystack = normalizeText(
        `${item.title} ${item.description} ${item.category}`
      );
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [queryTokens]);

  const filteredChannels = useMemo(() => {
    if (queryTokens.length === 0) return CHANNELS_DATA;
    return CHANNELS_DATA.filter((item) => {
      const haystack = normalizeText(
        `${item.name} ${item.platform} ${item.description} ${item.focus} ${item.rulesOfThumb.join(' ')}`
      );
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [queryTokens]);

  const totalFilteredCount =
    filteredProceedings.length +
    filteredRules.length +
    filteredForms.length +
    filteredChannels.length;

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* ========================================================= */}
      {/* 1. HERO & CABEÇALHO DO PORTAL DO MEMBRO */}
      {/* ========================================================= */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-950 text-green-400 font-mono text-xs font-bold tracking-widest border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
            <span>[ PORTAL DO MEMBRO • LAJE @ CIn/UFPE ]</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Área de Membros
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl font-sans max-w-4xl leading-relaxed">
            Acesse as diretrizes de desenvolvimento, regras internas, links diretos de formulários e nossos canais oficiais de comunicação.
          </p>
        </div>

        <div className="w-24 h-1.5 bg-green-500 rounded-full" />
      </section>

      {/* ========================================================= */}
      {/* 2. BARRA DE BUSCA RÁPIDA & NAVEGAÇÃO DE ABAS */}
      {/* ========================================================= */}
      <section className="flex flex-col gap-4">
        {/* Campo de Pesquisa Unificada */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-gray-950 border-2 border-green-500/40 rounded-2xl p-4 shadow-xl">
          <div className="relative w-full sm:max-w-lg">
            <Search className="w-5 h-5 text-green-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em procedimentos, regras, formulários ou canais..."
              className="w-full pl-11 pr-10 py-2.5 bg-black/70 border border-green-500/30 rounded-xl text-white placeholder-gray-400 font-sans text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs font-mono">
            {searchQuery ? (
              <span className="text-green-300 bg-green-950/60 px-3 py-1.5 rounded-lg border border-green-500/40">
                {totalFilteredCount} {totalFilteredCount === 1 ? 'resultado' : 'resultados'}
              </span>
            ) : (
              <span className="text-gray-400 hidden md:inline">
                Filtragem instantânea no portal
              </span>
            )}
          </div>
        </div>

        {/* Abas Principais de Conteúdo */}
        <div className="flex items-center gap-2 p-1.5 bg-gray-200/80 rounded-2xl border border-gray-300 overflow-x-auto no-scrollbar sm:flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('todos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'todos'
                ? 'bg-black text-green-300 shadow-md scale-[1.02]'
                : 'text-gray-700 hover:text-black hover:bg-gray-300/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Todos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('formularios')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'formularios'
                ? 'bg-black text-green-300 shadow-md scale-[1.02]'
                : 'text-gray-700 hover:text-black hover:bg-gray-300/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formulários ({filteredForms.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('procedimentos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'procedimentos'
                ? 'bg-black text-green-300 shadow-md scale-[1.02]'
                : 'text-gray-700 hover:text-black hover:bg-gray-300/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Procedimentos ({filteredProceedings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('regras')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'regras'
                ? 'bg-black text-green-300 shadow-md scale-[1.02]'
                : 'text-gray-700 hover:text-black hover:bg-gray-300/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Regras & Estatuto ({filteredRules.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comunicacao')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'comunicacao'
                ? 'bg-black text-green-300 shadow-md scale-[1.02]'
                : 'text-gray-700 hover:text-black hover:bg-gray-300/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Canais ({filteredChannels.length})</span>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SEÇÃO: FORMULÁRIOS INTERNOS (LINKS DIRETOS SIMPLES) */}
      {/* ========================================================= */}
      {(activeTab === 'todos' || activeTab === 'formularios') && (
        <section className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-green-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-black">
                  Formulários Internos
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-sans">
                  Acesse os formulários de cadastro de jogos, horas de extensão, patrimônio e ouvidoria
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-300">
              FORMULÁRIOS OFICIAIS
            </div>
          </div>

          {filteredForms.length === 0 ? (
            <div className="p-8 text-center bg-gray-100 rounded-2xl border border-gray-300 font-mono text-sm text-gray-600">
              Nenhum formulário encontrado para o termo pesquisado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredForms.map((form) => {
                const isFeatured = form.id === 'form-cadastro-jogos';

                return (
                  <div
                    key={form.id}
                    className={`p-5 sm:p-6 rounded-2xl text-white flex flex-col justify-between gap-4 transition-all shadow-lg group ${
                      isFeatured
                        ? 'bg-gray-950 border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.15)]'
                        : 'bg-gray-950 border-2 border-gray-850 hover:border-green-500/50'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                          {form.category}
                        </span>
                        {form.badge && (
                          <span
                            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                              isFeatured
                                ? 'bg-green-500 text-black shadow-sm'
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}
                          >
                            {form.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                        {form.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                        {form.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-850 flex items-center gap-2">
                      <a
                        href={form.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-2.5 px-4 rounded-xl font-mono font-bold text-xs tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-sm ${
                          isFeatured
                            ? 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-gray-900 hover:bg-gray-800 border border-green-500/40 text-green-300 hover:text-white'
                        }`}
                      >
                        <span>Abrir Formulário</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopy(`form-${form.id}`, form.url)}
                        className="p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
                        title="Copiar link do formulário"
                        aria-label="Copiar link do formulário"
                      >
                        {copiedKey === `form-${form.id}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 4. SEÇÃO: PROCEDIMENTOS INTERNOS */}
      {/* ========================================================= */}
      {(activeTab === 'todos' || activeTab === 'procedimentos') && (
        <section className="flex flex-col gap-5 pt-2">
          {/* Cabeçalho da Seção e Filtro com Scroll Horizontal no Mobile */}
          <div className="flex flex-col gap-4 pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-green-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-black">
                  Procedimentos Internos
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-sans">
                  Fluxos de desenvolvimento de jogos, versionamento no GitHub e uso dos espaços no CIn
                </p>
              </div>
            </div>

            {/* Filtro com scroll horizontal, botões maiores e hint visual */}
            <div className="flex flex-col gap-2 pt-1">
              {/* Hint visual no mobile */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-600 sm:hidden px-1">
                <span className="flex items-center gap-1.5 font-bold text-gray-800">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-green-600" />
                  Filtrar por área:
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-green-800 bg-green-100/90 border border-green-300 px-2 py-0.5 rounded-full shadow-xs">
                  <span>Deslize</span>
                  <span className="animate-pulse">↔</span>
                </span>
              </div>

              {/* Trilho de Scroll Horizontal com botões maiores e sombra indicadora */}
              <div className="relative w-full">
                {/* Efeito de fade à direita indicando conteúdo adicional no mobile */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-white sm:hidden z-10" />

                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-0.5 scroll-smooth no-scrollbar sm:flex-wrap">
                  {PROCEEDING_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedProceedingCategory === cat.id;
                    const count =
                      cat.id === 'Todas'
                        ? PROCEEDINGS_DATA.length
                        : PROCEEDINGS_DATA.filter((p) => p.category === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedProceedingCategory(cat.id)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-4 sm:py-2 rounded-xl text-sm font-mono font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer touch-manipulation active:scale-95 ${
                          isActive
                            ? 'bg-green-500 text-black border-2 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.35)] scale-[1.02]'
                            : 'bg-gray-950 text-gray-300 border-2 border-gray-800 hover:border-green-500/50 hover:bg-gray-900 hover:text-white'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-black' : 'text-green-400'
                          }`}
                        />
                        <span>{cat.label}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                            isActive
                              ? 'bg-black/20 text-black font-black'
                              : 'bg-gray-900 text-green-300 border border-gray-800'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {filteredProceedings.length === 0 ? (
            <div className="p-8 text-center bg-gray-100 rounded-2xl border border-gray-300 font-mono text-sm text-gray-600">
              Nenhum procedimento encontrado para o termo pesquisado.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredProceedings.map((item, idx) => {
                const isExpanded = expandedProceedingIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-gray-950 border-2 border-gray-850 hover:border-green-500/50 rounded-2xl overflow-hidden transition-all text-white shadow-lg"
                  >
                    {/* Header do Card (Clicável) */}
                    <button
                      type="button"
                      onClick={() => toggleProceeding(item.id)}
                      className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 border border-green-500/30 text-green-400 flex items-center justify-center font-mono font-bold shrink-0 shadow-inner group-hover:border-green-400 transition-colors">
                          0{idx + 1}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                              {item.tag}
                            </span>
                            <span className="text-xs font-sans text-gray-400">
                              • {item.category}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 font-sans line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-gray-900 text-gray-400 group-hover:text-green-300 transition-all shrink-0">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-green-400' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Conteúdo Expansível com Passos */}
                    {isExpanded && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-gray-850/80 space-y-4 animate-in fade-in duration-150">
                        <div className="space-y-2.5 pt-4">
                          <span className="text-xs font-mono font-bold tracking-widest text-green-400 uppercase">
                            Checklist & Passo a Passo
                          </span>
                          <div className="space-y-2">
                            {item.steps.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {item.tips && (
                          <div className="p-3.5 rounded-xl bg-green-950/20 border border-green-500/30 flex items-start gap-2.5 text-xs font-sans text-green-200">
                            <Sparkles className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-green-400 font-mono">Dica de Ouro:</strong>{' '}
                              {item.tips}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 5. SEÇÃO: REGRAS & ESTATUTO */}
      {/* ========================================================= */}
      {(activeTab === 'todos' || activeTab === 'regras') && (
        <section className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-green-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-black">
                  Regras & Diretrizes
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-sans">
                  Código de conduta, propriedade intelectual, assiduidade e integridade acadêmica
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-300">
              ESTATUTO VIGENTE • 2026
            </div>
          </div>

          {filteredRules.length === 0 ? (
            <div className="p-8 text-center bg-gray-100 rounded-2xl border border-gray-300 font-mono text-sm text-gray-600">
              Nenhuma regra encontrada com esse filtro.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-5 sm:p-6 rounded-2xl bg-gray-950 border-2 border-gray-850 hover:border-green-500/50 text-white flex flex-col justify-between gap-4 transition-all shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-300 border border-green-500/30">
                        {rule.category}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">
                      {rule.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      {rule.summary}
                    </p>

                    <div className="space-y-2 pt-1">
                      {rule.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-gray-400 font-sans leading-relaxed"
                        >
                          <span className="text-green-400 font-mono font-bold mt-0.5">{'>'}</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-900 border border-green-500/20 text-xs font-sans text-green-300">
                    <strong className="text-white font-mono uppercase text-[10px] block mb-0.5">
                      Diretriz Principal
                    </strong>
                    {rule.highlight}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 6. SEÇÃO: MEIOS DE COMUNICAÇÃO */}
      {/* ========================================================= */}
      {(activeTab === 'todos' || activeTab === 'comunicacao') && (
        <section className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-green-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-black">
                  Canais Oficiais de Comunicação
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-sans">
                  Onde os membros se comunicam: Discord de desenvolvimento, GitHub, grupos de avisos e contatos
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-300">
              COMUNICAÇÃO MULTIDISCIPLINAR
            </div>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="p-8 text-center bg-gray-100 rounded-2xl border border-gray-300 font-mono text-sm text-gray-600">
              Nenhum canal encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="p-5 rounded-2xl bg-gray-950 border-2 border-gray-850 hover:border-green-500/50 text-white flex flex-col justify-between gap-4 transition-all shadow-lg group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                        {channel.badge}
                      </span>
                      <span className="text-xs font-bold font-mono text-gray-400">
                        {channel.platform}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
                      {channel.name}
                    </h3>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {channel.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-sans text-gray-400">
                      <strong className="text-green-300 font-mono text-[11px] block mb-0.5">
                        Foco de Uso:
                      </strong>
                      {channel.focus}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                        Boas Práticas:
                      </span>
                      <ul className="text-[11px] text-gray-400 font-sans space-y-1">
                        {channel.rulesOfThumb.map((rule, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-green-400 font-mono text-xs">{'>'}</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-850 flex items-center gap-2">
                    <a
                      href={channel.primaryLink}
                      target={channel.primaryLink.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-gray-900 hover:bg-gray-850 border border-green-500/40 text-green-300 hover:text-white font-mono font-bold text-xs tracking-wide transition-all text-center flex items-center justify-center gap-1.5 group-hover:border-green-400"
                    >
                      <span>Acessar Canal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {channel.secondaryAction && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(`chan-${channel.id}`, channel.secondaryAction!.valueToCopy)
                        }
                        className="p-2 rounded-xl bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
                        title={channel.secondaryAction.label}
                        aria-label={channel.secondaryAction.label}
                      >
                        {copiedKey === `chan-${channel.id}` ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ========================================================= */}
      {/* 7. SEÇÃO: RECURSOS RÁPIDOS & TEMPLATES */}
      {/* ========================================================= */}
      <section className="flex flex-col gap-4 p-6 rounded-3xl bg-gray-950 border-2 border-green-500/40 shadow-2xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/40">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Kits & Modelos Rápidos
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-sans">
                Documentos padronizados para acelerar a produção de jogos
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {QUICK_RESOURCES_DATA.map((res) => (
            <div
              key={res.id}
              className="p-4 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-green-500/50 flex flex-col justify-between gap-3 transition-all"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-green-400 border border-green-500/30">
                  {res.type} • {res.fileFormat}
                </span>
                <h4 className="font-bold text-sm text-white pt-1">
                  {res.title}
                </h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {res.description}
                </p>
              </div>

              <a
                href={res.downloadOrUrl}
                target={res.downloadOrUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full p-2 rounded-lg bg-black hover:bg-gray-850 text-green-300 font-mono text-xs font-bold border border-green-500/30 hover:border-green-400 transition-colors"
              >
                <span>Acessar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CONTATOS: ORIENTADORES & E-MAIL PARA PROPÓSITOS GERAIS */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BOARD_CONTACTS.map((board, bIdx) => (
          <div
            key={bIdx}
            className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-gray-300 flex flex-col justify-between gap-3 shadow-sm hover:border-green-500 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                  {board.role}
                </span>
              </div>
              <h4 className="text-lg font-bold text-black pt-1">
                {board.names}
              </h4>
              <p className="text-xs text-gray-600 font-sans">
                {board.department}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-2">
              <a
                href={
                  board.contact.includes('|')
                    ? `mailto:${board.contact.split('|')[0].trim()}`
                    : `mailto:${board.contact}`
                }
                className="text-xs sm:text-sm font-mono text-gray-800 hover:text-green-700 font-semibold truncate flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4 text-green-600 shrink-0" />
                <span className="truncate">{board.contact}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(`board-${bIdx}`, board.contact)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer shrink-0"
                title="Copiar contato"
                aria-label="Copiar contato"
              >
                {copiedKey === `board-${bIdx}` ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
