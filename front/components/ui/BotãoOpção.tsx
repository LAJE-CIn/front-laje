// Componente botão utilizado para a página repositório

interface BotãoOpçãoProps {
  texto: string;
  cor: string;
}

export default function BotãoOpção({ texto, cor }: BotãoOpçãoProps) {
  return (
    <>
      <button
        className={`border-[3px] border-black w-full max-w-202 h-23 ${cor} border-r-2 rounded-xs text-black
        text-center text-[40px] font-medium leading-normal transition-all duration-250 ease-in-out hover:cursor-pointer hover:shadow-2xl hover:text-[45px]`}
      >
        {texto}
      </button>
    </>
  );
}
