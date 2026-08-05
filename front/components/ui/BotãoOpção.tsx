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
        className={`flex justify-center items-center border-[3px] border-black w-full max-w-60 md:max-w-150 lg:max-w-202 h-20 lg:h-23 ${cor} border-r-2 rounded-xs text-black
        text-3xl lg:text-[40px] font-medium leading-normal transition-all duration-250 ease-in-out hover:cursor-pointer hover:shadow-2xl hover:text-[45px] active:scale-95`}
      >
        {texto}
      </Link>
    </>
  );
}
