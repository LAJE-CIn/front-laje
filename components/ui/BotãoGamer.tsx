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
      className="inline-block bg-black text-green-300 clip-botao px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold tracking-wider animate-pulse transition-all duration-200 ease-in-out hover:cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      {`> ${texto}`}
    </Link>
  );
}
