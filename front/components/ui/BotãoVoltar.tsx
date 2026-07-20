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
      className="inline-flex items-center justify-center bg-gray-300 border-2 border-black text-2xl font-bold font-pixelify text-black w-50 h-10 p-2 hover:bg-gray-400 transition ease-in-out"
    >
      Voltar
    </Link>
  );
}
