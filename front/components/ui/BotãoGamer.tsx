// Importações
import Link from 'next/link';

// Botão estilo gamer utilizado no inicio

interface BotãoGamerProps {
  texto: string;
  href?: string;
}

export default function BotãoGamer({ texto, href }: BotãoGamerProps) {
  return (
    <Link
      href={href ?? ''}
      className="bg-black text-green-300 clip-botao p-4 animate-pulse transition-all ease-in-out hover:cursor-pointer active:scale-95"
    >
      {`> ${texto}`}
    </Link>
  );
}
