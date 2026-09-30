'use client';

// Importações
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Expand,
  FastForward,
  Minimize2,
  Rewind
} from 'lucide-react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ContentCard from '../ui/ContentCard';
import { Conteudo } from '@/lib/content';

// Container de conteúdos

interface ContentContainerProps {
  titulo: string;
  conteudo: Conteudo[];
  basePath: string;
  defaultExpanded?: boolean;
  defaultPageSize?: number;
}

export default function ContentContainer({
  titulo,
  conteudo,
  basePath,
  defaultExpanded = false,
  defaultPageSize = 8
}: ContentContainerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawId = useId();
  // Safe CSS selector identifier
  const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;

  // Cálculo de paginação
  const totalItems = conteudo.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Ajusta a página atual se exceder o total de páginas ao filtrar ou trocar o tamanho da página
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (newPage: number) => {
    const targetPage = Math.max(1, Math.min(totalPages, newPage));
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  // Itens da página atual quando expandido
  const paginatedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return conteudo.slice(startIndex, startIndex + pageSize);
  }, [conteudo, currentPage, pageSize]);

  // Gerador de páginas visíveis com reticências
  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: (number | string)[] = [];

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) items.push(i);
      items.push('...');
      items.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      items.push(1);
      items.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      items.push('...');
      items.push(currentPage - 1);
      items.push(currentPage);
      items.push(currentPage + 1);
      items.push('...');
      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages]);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center border-2 border-black bg-white/50 rounded-2xl p-4 sm:p-6 gap-4 sm:gap-6 shadow-xl transition-all duration-300"
    >
      {/* Nome e expansão / redimensionamento */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-wide">
            {titulo}
          </h3>
          <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full border-2 border-black bg-white text-black shadow-xs">
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Botão de redimensionamento / expandir para preencher a aba */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black bg-white hover:bg-black hover:text-white text-black font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
          title={
            isExpanded
              ? 'Recolher para modo carrossel'
              : 'Redimensionar para preencher a aba'
          }
          aria-label={
            isExpanded
              ? 'Recolher para modo carrossel'
              : 'Redimensionar para preencher a aba'
          }
        >
          {isExpanded ? (
            <>
              <Minimize2 size={18} />
              <span>Recolher</span>
            </>
          ) : (
            <>
              <Expand size={18} />
              <span>Expandir</span>
            </>
          )}
        </button>
      </div>

      {/* Cards com slider (Modo Compacto) */}
      {!isExpanded ? (
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[340px] px-1 sm:px-10">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={12}
            breakpoints={{
              520: {
                slidesPerView: 2,
                spaceBetween: 16
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
            className="w-full h-full custom-swiper"
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: `.${nextClass}`,
              prevEl: `.${prevClass}`
            }}
          >
            {conteudo.map((element) => (
              <SwiperSlide
                key={element.slug}
                className="h-full pb-8 pt-1 flex justify-center"
              >
                <div className="w-full h-full flex justify-center">
                  <ContentCard
                    slug={element.slug}
                    cover={element.imagem}
                    nome={element.nome}
                    basePath={basePath}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botões de Navegação Customizados */}
          <button
            type="button"
            className={`${prevClass} custom-swiper-button absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex justify-center items-center cursor-pointer bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-2 border border-green-400 shadow-md transition-all active:scale-95`}
            aria-label="Anterior"
          >
            <Rewind size={24} className="text-green-400" />
          </button>

          <button
            type="button"
            className={`${nextClass} custom-swiper-button absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex justify-center items-center cursor-pointer bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-2 border border-green-400 shadow-md transition-all active:scale-95`}
            aria-label="Próximo"
          >
            <FastForward size={24} className="text-green-400" />
          </button>
        </div>
      ) : (
        /* Expandido / Preenchendo a aba (Opções em tamanho grande) */
        <div className="flex flex-col gap-6 w-full">
          {paginatedContent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center w-full">
              {paginatedContent.map((element) => (
                <div
                  key={element.slug}
                  className="h-[250px] sm:h-[300px] w-full flex justify-center"
                >
                  <ContentCard
                    slug={element.slug}
                    cover={element.imagem}
                    nome={element.nome}
                    basePath={basePath}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 font-bold text-lg">
              Nenhum item encontrado nesta página.
            </div>
          )}

          {/* Painel de Paginação e Navegação Abaixo */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-black/10 w-full">
            {/* Contador de páginas e itens */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-black">
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <span className="text-gray-500 font-medium">
                ({startItem}-{endItem} de {totalItems} itens)
              </span>
            </div>

            {/* Controles de navegação e salto de página */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {/* Pular para Primeira Página */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black shadow-xs cursor-pointer"
                title="Primeira página"
                aria-label="Primeira página"
              >
                <ChevronsLeft size={18} />
              </button>

              {/* Página Anterior */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black shadow-xs cursor-pointer"
                title="Página anterior"
                aria-label="Página anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Números das páginas */}
              <div className="flex items-center gap-1">
                {paginationItems.map((item, idx) =>
                  typeof item === 'number' ? (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      className={`min-w-[34px] h-[34px] sm:min-w-[38px] sm:h-[38px] px-2 rounded-lg font-bold text-sm sm:text-base border-2 transition-all active:scale-95 cursor-pointer ${
                        currentPage === item
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white hover:bg-gray-100 text-black border-black/30 hover:border-black shadow-xs'
                      }`}
                      aria-current={currentPage === item ? 'page' : undefined}
                    >
                      {item}
                    </button>
                  ) : (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-1 text-gray-500 font-bold select-none"
                    >
                      ...
                    </span>
                  )
                )}
              </div>

              {/* Próxima Página */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black shadow-xs cursor-pointer"
                title="Próxima página"
                aria-label="Próxima página"
              >
                <ChevronRight size={18} />
              </button>

              {/* Pular para Última Página */}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white text-black transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black shadow-xs cursor-pointer"
                title="Última página"
                aria-label="Última página"
              >
                <ChevronsRight size={18} />
              </button>
            </div>

            {/* Seletores: Escolha de página direta e itens por página */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Escolher número da página diretamente */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black">
                <label htmlFor={`jump-page-${uniqueId}`}>Página:</label>
                <select
                  id={`jump-page-${uniqueId}`}
                  value={currentPage}
                  onChange={(e) => handlePageChange(Number(e.target.value))}
                  className="bg-white border-2 border-black rounded-lg px-2 py-1 text-xs sm:text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-xs"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Itens por página */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black">
                <label htmlFor={`page-size-${uniqueId}`}>Exibir:</label>
                <select
                  id={`page-size-${uniqueId}`}
                  value={pageSize}
                  onChange={(e) => {
                    const newSize = Number(e.target.value);
                    setPageSize(newSize);
                    setCurrentPage(1);
                  }}
                  className="bg-white border-2 border-black rounded-lg px-2 py-1 text-xs sm:text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-xs"
                >
                  {[4, 8, 12, 16, 24].map((size) => (
                    <option key={size} value={size}>
                      {size} por vez
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

