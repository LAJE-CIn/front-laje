// Importações
import Header from '@/components/shared/Header';
import ContentContainer from '@/components/shared/ContentContainer';
import BotãoOpção from '@/components/ui/BotãoOpção';
import { getJogos, getEventosOrdenados } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function RepositorioPage() {
  const jogos = await getJogos();
  const colecoes = await getEventosOrdenados();

  const botãoJogo = {
    texto: 'Jogos',
    cor: 'bg-[#A7A7FF]',
    path: '/repositorio/jogos'
  };

  const botãoColecoes = {
    texto: 'Coleções',
    cor: 'bg-[#F7FF88]',
    path: '/repositorio/colecoes'
  };

  return (
    <div className="min-h-screen flex flex-col pb-16">
      <Header selected="repositorio" />

      <main className="flex-1 flex flex-col gap-10 max-w-7xl mx-auto w-full px-4 pt-28 sm:pt-36">
        {/* Banner de atalho para as seções principais */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-gray-900/90 border-2 border-green-500 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <BotãoOpção
              texto={botãoJogo.texto}
              cor={botãoJogo.cor}
              path={botãoJogo.path}
            />
            <p className="text-gray-300 text-sm sm:text-base text-center max-w-xs font-sans">
              Procure por jogos individuais, separados por gênero e com filtros.
            </p>
          </div>

          <div className="hidden md:block w-px h-24 bg-gray-700" />

          <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
            <BotãoOpção
              texto={botãoColecoes.texto}
              cor={botãoColecoes.cor}
              path={botãoColecoes.path}
            />
            <p className="text-gray-300 text-sm sm:text-base text-center max-w-xs font-sans">
              Procure por coleções de jogos, gamejams, eventos e IP.
            </p>
          </div>
        </div>

        {/* Carrossel de Jogos */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-wide">
              Jogos
            </h2>
            <Link
              href="/repositorio/jogos"
              className="flex items-center gap-2 text-green-700 hover:text-green-900 font-bold text-sm sm:text-lg transition-colors group"
            >
              <span>Ver todos os jogos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ContentContainer
            titulo="Destaques de Jogos"
            conteudo={jogos}
            basePath="/repositorio/jogos"
          />
        </section>

        {/* Carrossel de Coleções */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-wide">
              Coleções
            </h2>
            <Link
              href="/repositorio/colecoes"
              className="flex items-center gap-2 text-green-700 hover:text-green-900 font-bold text-sm sm:text-lg transition-colors group"
            >
              <span>Ver todas as coleções</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ContentContainer
            titulo="Destaques de Coleções"
            conteudo={colecoes}
            basePath="/repositorio/colecoes"
          />
        </section>
      </main>
    </div>
  );
}

