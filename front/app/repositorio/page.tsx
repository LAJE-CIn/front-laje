// Importações
import BotãoOpção from '@/components/ui/BotãoOpção';

export default function RepositorioPage() {
  const botãoJogo = {
    texto: 'Jogos',
    cor: 'bg-[#A7A7FF]'
  };

  const botãoEventos = {
    texto: 'Eventos',
    cor: 'bg-[#F7FF88]'
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-6">
      <BotãoOpção texto={botãoJogo.texto} cor={botãoJogo.cor} />
      <BotãoOpção texto={botãoEventos.texto} cor={botãoEventos.cor} />
    </div>
  );
}
