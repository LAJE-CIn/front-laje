// Importações

import { Gamepad2 } from 'lucide-react';

// Selo de link para a página do jogo no itch.io

interface ItchBadgeProps {
  href: string;
}

export default function ItchBadge({ href }: ItchBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xs border-2 border-black hover:bg-red-600 transition ease-in-out"
    >
      <Gamepad2 size={22} />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] font-normal">available on</span>
        <span className="text-sm font-bold">itch.io</span>
      </span>
    </a>
  );
}
