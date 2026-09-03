'use client';

// Importações
import { useId, useState } from 'react';
import { Expand, FastForward, Minimize2, Rewind } from 'lucide-react';
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
}

export default function ContentContainer({
  titulo,
  conteudo,
  basePath
}: ContentContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rawId = useId();
  // Safe CSS selector identifier
  const uniqueId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;

  return (
    <div className="flex flex-col justify-center border-2 border-black bg-white/50 rounded-2xl p-4 sm:p-6 gap-4 sm:gap-6 shadow-xl">
      {/* Nome e expansão */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-wide">
          {titulo}
        </h3>
        {conteudo.length >= 4 && (
          <button
            className="flex items-center justify-center p-2 rounded-lg hover:cursor-pointer hover:bg-black/10 transition-all ease-in-out"
            onClick={toggleExpand}
            aria-label={
              isExpanded ? 'Recolher visualização' : 'Expandir visualização'
            }
            title={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {!isExpanded ? (
              <Expand size={26} className="text-black" />
            ) : (
              <Minimize2 size={26} className="text-black" />
            )}
          </button>
        )}
      </div>

      {/* Cards com slider */}
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
              <SwiperSlide key={element.slug} className="h-full pb-8 pt-1 flex justify-center">
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
        /* Expandido */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center">
          {conteudo.map((element) => (
            <div key={element.slug} className="h-[250px] sm:h-[300px] w-full">
              <ContentCard
                slug={element.slug}
                cover={element.imagem}
                nome={element.nome}
                basePath={basePath}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

