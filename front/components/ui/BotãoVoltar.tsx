'use client';

import { useRouter } from 'next/navigation';

export default function BotãoVoltar() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center justify-center bg-gray-300 border-2 border-black text-xl md:text-2xl font-bold font-pixelify text-black min-h-11 px-4 py-2 active:bg-gray-500 hover:bg-gray-400 transition ease-in-out"
    >
      Voltar
    </button>
  );
}
