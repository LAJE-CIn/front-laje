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
      className="group relative flex flex-col justify-end w-full h-50 bg-cover rounded-lg border-2 overflow-hidden transition-transform duration-200 ease-in-out active:scale-95 hover:scale-105 hover:cursor-pointer shadow-md hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100" />

      <p className="relative z-10 p-3 text-center text-white font-semibold text-lg  transition-all duration-300 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
        {nome}
      </p>
    </Link>
  );
}
