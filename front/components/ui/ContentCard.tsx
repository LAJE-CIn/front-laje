// Card para fotos dos jogos/eventos

interface ContentCardProps {
  cover: string;
  nome: string;
}

export default function ContentCard({ cover, nome }: ContentCardProps) {
  return (
    <div
      style={{ backgroundImage: `url(${cover})` }}
      className=" flex flex-col-reverse bg-cover max-w-67 h-43 transition ease-in-out duration-200 hover:scale-105 hover:cursor-pointer border-2 rounded-2xl  group"
    >
      <p className="opacity-0 text-white font=medium text-xl group-hover:opacity-100 text-center transition ease-in-out bg-black/40 rounded-2xl">
        {nome}
      </p>
    </div>
  );
}
