import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import FaqAccordion from '@/components/faq/FaqAccordion';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - Perguntas Frequentes | LAJE',
  description:
    'Tire suas dúvidas sobre a Liga Acadêmica de Jogos Eletrônicos (LAJE), processos seletivos, desenvolvimento de jogos, game jams e parcerias no CIn/UFPE.'
};

export default function FaqPage() {
  return (
    <PageContainer className="flex flex-col gap-10">
      {/* Cabeçalho da Página */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 text-green-400 font-mono text-xs font-bold tracking-widest border border-green-500/40">
            <HelpCircle className="w-4 h-4 text-green-400" />
            <span>[ CENTRAL DE AJUDA & FAQ ]</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-wide">
          Perguntas Frequentes
        </h1>

        <p className="text-gray-700 text-base sm:text-lg md:text-xl font-sans max-w-3xl leading-relaxed">
          Tudo o que você precisa saber sobre a{' '}
          <strong className="text-black font-semibold">LAJE</strong>: quem
          somos, como ingressar nos nossos projetos, tecnologias utilizadas,
          game jams e a filiação acadêmica ao CIn e à UFPE.
        </p>

        <div className="w-24 h-1 bg-green-500 rounded-full" />
      </section>

      {/* Accordion Interativo com Busca e Categorias */}
      <section>
        <FaqAccordion />
      </section>
    </PageContainer>
  );
}
