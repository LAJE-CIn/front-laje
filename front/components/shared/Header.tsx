'use client';

// Importações
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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
        className="fixed top-0 left-0 w-full z-40 bg-linear-to-b from-green-300/90 from-50% via-green-300/70 via-80% to-transparent text-green-300 p-3 lg:p-5"
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
        {/* VERSÃO MOBILE E TABLET (< lg): Logo grande centralizada   */}
        {/* e botão de abrir o menu de navegação                      */}
        {/* ========================================================= */}
        <div className="flex lg:hidden justify-center items-center relative w-full max-w-7xl mx-auto px-2">
          {/* Logo LAJE com tamanho grande preservado */}
          <Link
            href="/"
            className="w-60 sm:w-72 md:w-80 h-20 clip-trapezio bg-linear-to-b bg-gray-900 flex justify-center items-center group transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-black/50"
            aria-label="Página inicial LAJE"
          >
            <div
              className="w-14 h-14 bg-green-300 mask-centro group-hover:bg-green-400 transition-colors pointer-events-none"
              style={{
                maskImage: `url('/icon.png')`,
                WebkitMaskImage: `url('/icon.png')`
              }}
            />
          </Link>

          {/* Botão para abrir o menu de navegação */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-900/95 hover:bg-gray-800 border-2 border-green-500/70 hover:border-green-400 text-green-300 hover:text-green-200 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            aria-label="Abrir menu de navegação"
            aria-expanded={isSidebarOpen}
          >
            <Menu className="w-6 h-6 text-green-400" />
            <span className="hidden sm:inline font-mono text-xs font-bold tracking-widest uppercase">
              MENU
            </span>
          </button>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* TELA DE NAVEGAÇÃO (FULLSCREEN): Tela completa para mobile  */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-gray-950/98 backdrop-blur-2xl p-6 sm:p-10 overflow-y-auto transition-all duration-300 ease-out ${
          isSidebarOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        aria-label="Tela de navegação principal"
        role="dialog"
        aria-modal="true"
      >
        {/* Topo da Tela: Identidade LAJE e Botão Fechar */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-800/80 max-w-2xl mx-auto w-full">
          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 bg-gray-900 border-2 border-green-500/60 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:border-green-400 transition-colors">
              <div
                className="w-8 h-8 bg-green-400 mask-centro"
                style={{
                  maskImage: `url('/icon.png')`,
                  WebkitMaskImage: `url('/icon.png')`
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-widest group-hover:text-green-300 transition-colors font-sans">
                LAJE
              </span>
              <span className="text-[10px] font-mono text-green-400 tracking-widest uppercase">
                [ NAVEGAÇÃO DO SISTEMA ]
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-900/90 border border-gray-700 text-gray-300 hover:text-green-300 hover:border-green-400 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-lg active:scale-95"
            aria-label="Fechar tela de navegação"
          >
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider hidden sm:inline">
              FECHAR
            </span>
            <X className="w-6 h-6 text-green-400" />
          </button>
        </div>

        {/* Centro da Tela: Links de Navegação em Destaque */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full py-8 sm:py-12">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 px-2">
            // SELECIONE O DESTINO
          </span>

          <nav className="flex flex-col gap-3 sm:gap-4">
            {navLinks.map((item, index) => {
              const isActive = selected === item.id;
              const indexStr = String(index + 1).padStart(2, '0');
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 rounded-2xl font-black tracking-wider transition-all duration-200 border-2 ${
                    isActive
                      ? 'bg-green-500/15 border-green-500 text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.25)] translate-x-1'
                      : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:bg-gray-900 hover:border-green-500/50 hover:text-green-300 hover:translate-x-2'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-sm sm:text-base ${
                        isActive
                          ? 'text-green-400 font-bold'
                          : 'text-gray-500 group-hover:text-green-400'
                      }`}
                    >
                      {indexStr}
                    </span>
                    <span className="text-xl sm:text-2xl lg:text-3xl uppercase">
                      {item.label}
                    </span>
                  </div>

                  <span
                    className={`font-mono text-lg sm:text-xl transition-transform duration-200 ${
                      isActive
                        ? 'text-green-400 translate-x-1'
                        : 'text-gray-600 group-hover:text-green-400 group-hover:translate-x-2'
                    }`}
                  >
                    {'>'}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Tela de Navegação */}
        <div className="pt-6 border-t border-gray-800/80 max-w-2xl mx-auto w-full text-center flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-mono text-gray-500 tracking-wider uppercase">
          <span>LIGA ACADÊMICA DE JOGOS ELETRÔNICOS</span>
          <span className="text-green-400/80">● ONLINE</span>
        </div>
      </div>
    </>
  );
}
