import { Gamepad2, Sparkles, Terminal, Cpu, Layers, Compass } from 'lucide-react';

interface PlaceholderTBDProps {
  seed: string;
  label?: string;
  className?: string;
}

const PALETTES = [
  {
    bg: 'from-emerald-950 via-gray-900 to-teal-950',
    accent: 'text-emerald-400 border-emerald-400/50 bg-emerald-500/10',
    glow: 'bg-emerald-500/20',
    Icon: Gamepad2
  },
  {
    bg: 'from-indigo-950 via-slate-900 to-purple-950',
    accent: 'text-indigo-400 border-indigo-400/50 bg-indigo-500/10',
    glow: 'bg-indigo-500/20',
    Icon: Sparkles
  },
  {
    bg: 'from-amber-950 via-stone-900 to-orange-950',
    accent: 'text-amber-400 border-amber-400/50 bg-amber-500/10',
    glow: 'bg-amber-500/20',
    Icon: Terminal
  },
  {
    bg: 'from-rose-950 via-zinc-900 to-pink-950',
    accent: 'text-rose-400 border-rose-400/50 bg-rose-500/10',
    glow: 'bg-rose-500/20',
    Icon: Cpu
  },
  {
    bg: 'from-cyan-950 via-slate-900 to-sky-950',
    accent: 'text-cyan-400 border-cyan-400/50 bg-cyan-500/10',
    glow: 'bg-cyan-500/20',
    Icon: Layers
  },
  {
    bg: 'from-lime-950 via-neutral-900 to-green-950',
    accent: 'text-lime-400 border-lime-400/50 bg-lime-500/10',
    glow: 'bg-lime-500/20',
    Icon: Compass
  }
];

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export default function PlaceholderTBD({
  seed,
  label = 'TBD',
  className = ''
}: PlaceholderTBDProps) {
  const hash = hashSeed(seed || 'tbd');
  const palette = PALETTES[hash % PALETTES.length];
  const { Icon } = palette;
  const angle = (hash % 4) * 45;

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${palette.bg} flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Grade geométrica sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          transform: `rotate(${angle}deg) scale(1.2)`
        }}
      />

      {/* Brilho central */}
      <div
        className={`absolute w-28 h-28 rounded-full blur-2xl ${palette.glow}`}
      />

      {/* Ícone e badge TBD */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className={`p-3 rounded-xl border ${palette.accent}`}>
          <Icon className="w-7 h-7" />
        </div>
        <span
          className={`px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest uppercase rounded border ${palette.accent}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
