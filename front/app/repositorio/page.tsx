// Importações
import BotãoOpção from '@/components/ui/BotãoOpção';
import Header from '@/components/shared/Header';

export default function RepositorioPage() {
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
    <div className="min-h-screen flex flex-col">
      <Header selected="repositorio"></Header>
      {/* Botão Jogo */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-stretch gap-6">
          <div className="group flex flex-col items-center gap-5 lg:gap-10">
            <p className="lg:opacity-0 text-xl lg:text-2xl transition-opacity duration-200 lg:group-hover:opacity-100 text-center">
              Procure por jogos individuais, separados por gênero e com uma
              seleção de filtros.
            </p>
            <BotãoOpção
              texto={botãoJogo.texto}
              cor={botãoJogo.cor}
              path={botãoJogo.path}
            />
          </div>

          {/* Botão Evento */}
          <div className="group flex flex-col items-center gap-5 lg:gap-10">
            <BotãoOpção
              texto={botãoColecoes.texto}
              cor={botãoColecoes.cor}
              path={botãoColecoes.path}
            />
            <p className="lg:opacity-0 text-xl lg:text-2xl transition-opacity duration-200 lg:group-hover:opacity-100 text-center">
              Procure por coleções de jogos, como gamejams, eventos, jogos de
              IP, entre outros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
