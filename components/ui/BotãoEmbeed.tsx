// Importações
import { SquareArrowOutUpRight } from "lucide-react";
import type { ReactNode } from "react";

// Botão embeed para footer

interface BotãoEmbeedProps {
  href: string;
  label: string;
  image?: ReactNode;
  className?: string;
}

export default function BotãoEmbeed({
  href,
  label,
  image,
  className = "self-baseline",
}: BotãoEmbeedProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex ${className} items-center justify-between gap-3 border border-green-300/40 rounded-full py-1.5 pl-3 pr-4 text-xs text-green-300 hover:bg-green-900/30 hover:border-green-300/70 transition-all duration-200`}
    >
      <span className="flex items-center gap-1.5">
        {image && (
          <span className="flex size-4 items-center justify-center">
            {image}
          </span>
        )}
        <span className="whitespace-nowrap text-[12px] font-medium tracking-wide">
          {label}
        </span>
      </span>
      <SquareArrowOutUpRight className="h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
