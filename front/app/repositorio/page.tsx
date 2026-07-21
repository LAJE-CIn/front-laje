// Importações
import BotãoOpção from '@/components/ui/BotãoOpção';

export default function RepositorioPage() {
  const botãoJogo = {
    texto: 'Jogos',
    cor: 'bg-[#A7A7FF]',
    path: '/repositorio/jogos'
  };

  const botãoEventos = {
    texto: 'Eventos',
    cor: 'bg-[#F7FF88]',
    path: '/repositorio/eventos'
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-6">
      {/* Botão Jogo */}

      <BotãoOpção
        texto={botãoJogo.texto}
        cor={botãoJogo.cor}
        path={botãoJogo.path}
      />

      {/* Botão Evento */}

      <BotãoOpção
        texto={botãoEventos.texto}
        cor={botãoEventos.cor}
        path={botãoEventos.path}
      />
    </div>
  );
}
