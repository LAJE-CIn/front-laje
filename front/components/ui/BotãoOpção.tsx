// Importações

import Link from 'next/link';

// Componente botão utilizado para a página repositório

interface BotãoOpçãoProps {
  texto: string;
  cor: string;
  path: string;
}

export default function BotãoOpção({ texto, cor, path }: BotãoOpçãoProps) {
  return (
    <>
      <Link
        href={path}
        className={`flex justify-center items-center border-[3px] border-black w-full max-w-202 h-23 ${cor} border-r-2 rounded-xs text-black
        text-[40px] font-medium leading-normal transition-all duration-250 ease-in-out hover:cursor-pointer hover:shadow-2xl hover:text-[45px]`}
      >
        {texto}
      </Link>
    </>
  );
}
