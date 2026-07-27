// Importações
import Link from 'next/link';

// Card para fotos dos jogos/eventos
interface ContentCardProps {
  slug: string;
  cover: string;
  nome: string;
  basePath: string;
}

export default function ContentCard({
  slug,
  cover,
  nome,
  basePath
}: ContentCardProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      style={{ backgroundImage: `url('${cover}')` }}
      className="flex flex-col-reverse bg-cover w-full h-43 transition ease-in-out duration-200 active:scale-95 focus:scale-105 md:hover:scale-105 hover:cursor-pointer border-2 rounded-xs group"
    >
      <p className="opacity-100 lg:opacity-0 text-white font-medium text-xl  group-focus:opacity-100 md:group-hover:opacity-100 text-center transition ease-in-out bg-black/40 rounded-xs">
        {nome}
      </p>
    </Link>
  );
}
