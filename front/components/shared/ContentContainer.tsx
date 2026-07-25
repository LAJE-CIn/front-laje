'use client';

// Importações
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ContentCard from '../ui/ContentCard';
import Posts from '@/schemas/posts.interface';
import { FastForward, Rewind, Expand, Minimize2 } from 'lucide-react';
import { useState } from 'react';

// Container de conteúdos

interface ContentContainerProps {
  titulo: string;
  conteudo: Posts[];
  basePath: string;
}

export default function ContentContainer({
  titulo,
  conteudo,
  basePath
}: ContentContainerProps) {
  // State para expansão

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex flex-col justify-center border-2 border-black bg-white/50 rounded-xs p-6 gap-6 shadow-2xl">
      {/* Nome e expansão */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-black tracking-wide">
          {titulo}
        </h1>
        {conteudo.length >= 5 && (
          <button
            className="flex items-center justify-center p-2 rounded-md hover:cursor-pointer hover:bg-black/10 transition-all ease-in-out"
            onClick={toggleExpand}
            aria-label={
              isExpanded ? 'Recolher visualização' : 'Expandir visualização'
            }
            title={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {!isExpanded ? (
              <Expand size={30} color="black"></Expand>
            ) : (
              <Minimize2 size={30} color="black"></Minimize2>
            )}
          </button>
        )}
      </div>

      {/* Cards com slider */}
      {!isExpanded ? (
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
              slidesOffsetAfter: 20,
              slidesOffsetBefore: 20
            },
            768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 32 }
          }}
          className="w-full"
          slidesOffsetAfter={50}
          slidesOffsetBefore={50}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        >
          {conteudo.map((element) => (
            <SwiperSlide key={element.slug}>
              <div className="py-4 px-1">
                <ContentCard
                  slug={element.slug}
                  cover={element.cover}
                  nome={element.nome}
                  basePath={basePath}
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Estilização dos botões */}

          <div className="swiper-button-prev flex justify-center items-center">
            <Rewind size={64} color="white" />
          </div>

          <div className="swiper-button-next flex justify-center items-center">
            <FastForward size={64} color="white" />
          </div>
        </Swiper>
      ) : (
        /* Expandido */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-7 items-center justify-center">
          {conteudo.map((element) => (
            <div key={element.slug} className="py-4 px-1">
              <ContentCard
                slug={element.slug}
                cover={element.cover}
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
