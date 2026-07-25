// Importações

import Link from 'next/link';

// Botão voltar

interface BotãoVoltarProps {
  path: string;
}

export default function BotãoVoltar({ path }: BotãoVoltarProps) {
  return (
    <Link
      href={path}
      className="inline-flex items-center justify-center bg-gray-300 border-2 border-black text-xl  md:text-2xl font-bold font-pixelify text-black  min-h-11 px-4 py-2 active:bg-gray-500 hover:bg-gray-400 transition ease-in-out"
    >
      Voltar
    </Link>
  );
}
