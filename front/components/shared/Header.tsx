'use client';

// Importações
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

// Componente Header

interface HeaderProps {
  selected: 'inicio' | 'noticias' | 'repositorio' | 'artigos';
}

const navLinks = [
  { id: 'inicio', label: 'Início', href: '/' },
  { id: 'noticias', label: 'Notícias', href: '/noticias' },
  { id: 'artigos', label: 'Artigos', href: '/artigos' },
  { id: 'repositorio', label: 'Repositório', href: '/repositorio' }
] as const;

export default function Header({ selected }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fechar barra lateral ao pressionar Escape e travar rolagem do body quando aberta
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);

  const getDesktopLinkStyle = (path: string) => {
    const isActive = selected === path;
    return `
      text-base xl:text-xl font-bold tracking-wide pb-1 border-b-4 transition-all duration-200 ease-in-out whitespace-nowrap
      ${
        isActive
          ? 'border-green-500 text-green-300'
          : 'border-transparent text-green-200 hover:border-green-300/50 hover:text-green-500'
      }
    `;
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-30 bg-linear-to-b from-green-300/90 from-50% via-green-300/70 via-80% to-transparent text-green-300 p-3 lg:p-5"
        aria-label="Navegação principal"
      >
        {/* ========================================================= */}
        {/* VERSÃO DESKTOP (>= lg): Atalhos laterais e trapézio central */}
        {/* ========================================================= */}
        <div className="hidden lg:flex justify-between items-start text-center max-w-7xl mx-auto w-full">
          {/* Parte Esquerda */}
          <div className="flex-1 flex justify-around h-14 relative z-0 items-center clip-lateral-esq -mr-11 bg-gray-900 px-4">
            <Link href={'/'} className={getDesktopLinkStyle('inicio')}>
              Início
            </Link>
            <Link
              href={'/noticias'}
              className={getDesktopLinkStyle('noticias')}
            >
              Notícias
            </Link>
          </div>

          {/* Parte da Imagem Central */}
          <div className="shrink-0 flex flex-col items-center relative z-10">
            <Link
              href="/"
              className="w-72 xl:w-96 h-20 clip-trapezio bg-linear-to-b bg-gray-900 flex justify-center items-center group transition-transform hover:scale-105 active:scale-95"
              aria-label="Página inicial LAJE"
            >
              <div
                className="w-14 h-14 bg-green-300 mask-centro group-hover:bg-green-400 transition-colors"
                style={{
                  maskImage: `url('/icon.png')`,
                  WebkitMaskImage: `url('/icon.png')`
                }}
              />
            </Link>
          </div>

          {/* Parte da Direita */}
          <div className="flex-1 h-14 relative z-0 flex justify-around items-center -ml-11 clip-lateral-dir bg-gray-900 px-4">
            <Link href={'/artigos'} className={getDesktopLinkStyle('artigos')}>
              Artigos
            </Link>
            <Link
              href={'/repositorio'}
              className={getDesktopLinkStyle('repositorio')}
            >
              Repositório
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VERSÃO MOBILE E TABLET (< lg): Logo centralizada que aciona */}
        {/* a barra lateral com os atalhos                            */}
        {/* ========================================================= */}
        <div className="flex lg:hidden justify-center items-center w-full">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen((prev) => !prev);
            }}
            className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-b-xl cursor-pointer"
            aria-label="Abrir menu lateral"
            aria-expanded={isSidebarOpen}
          >
            <div className="w-28 sm:w-36 h-14 sm:h-16 clip-trapezio bg-gray-900 border-b border-green-500/50 flex flex-col justify-center items-center shadow-lg shadow-black/40 transition-all duration-200 group-hover:bg-gray-800 group-hover:shadow-green-500/20 group-active:scale-95">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 bg-green-300 mask-centro group-hover:bg-green-400 transition-colors pointer-events-none"
                style={{
                  maskImage: `url('/icon.png')`,
                  WebkitMaskImage: `url('/icon.png')`
                }}
              />
              <span className="text-[9px] font-mono text-green-400 font-bold tracking-widest uppercase -mt-0.5 group-hover:text-green-300 pointer-events-none">
                MENU ▼
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* BARRA LATERAL (DRAWER): Menu lateral em telas menores       */}
      {/* ========================================================= */}
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden cursor-pointer"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Painel da Barra Lateral */}
      <aside
        className="fixed inset-y-0 left-0 h-screen w-72 sm:w-80 bg-gray-950 border-r-2 border-green-500/50 z-50 flex flex-col p-6 shadow-2xl lg:hidden overflow-y-auto"
        style={{
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          visibility: isSidebarOpen ? 'visible' : 'hidden'
        }}
        aria-label="Menu lateral de navegação"
      >
        {/* Topo da Barra Lateral: Logo LAJE e Botão Fechar */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-800">
          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gray-900 border border-green-500/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <div
                className="w-8 h-8 bg-green-400 mask-centro"
                style={{
                  maskImage: `url('/icon.png')`,
                  WebkitMaskImage: `url('/icon.png')`
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-wider group-hover:text-green-300 transition-colors">
                LAJE
              </span>
              <span className="text-[10px] font-mono text-green-400 tracking-wider uppercase">
                Menu de Acesso
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:text-green-300 hover:border-green-400 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            aria-label="Fechar menu lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-col gap-2.5 py-6 flex-1">
          {navLinks.map((item) => {
            const isActive = selected === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-green-500/20 text-green-300 border-l-4 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)] text-lg'
                    : 'text-gray-300 hover:text-green-300 hover:bg-gray-900/70 border-l-4 border-transparent text-lg'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`font-mono text-sm ${
                    isActive ? 'text-green-400 font-black' : 'text-gray-600'
                  }`}
                >
                  {'>'}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Rodapé da Barra Lateral */}
        <div className="pt-4 border-t border-gray-800/80 text-center">
          <p className="text-[11px] font-mono text-gray-500 tracking-wider uppercase">
            LIGA ACADÊMICA DE JOGOS ELETRÔNICOS
          </p>
        </div>
      </aside>
    </>
  );
}
