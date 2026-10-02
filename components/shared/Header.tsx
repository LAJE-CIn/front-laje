'use client';

// Importações
import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Componente Header

interface HeaderProps {
  selected?: 'inicio' | 'noticias' | 'repositorio' | 'artigos';
}

const navLinks = [
  { id: 'inicio', label: 'Início', href: '/' },
  { id: 'noticias', label: 'Notícias', href: '/noticias' },
  { id: 'artigos', label: 'Artigos', href: '/artigos' },
  { id: 'repositorio', label: 'Repositório', href: '/repositorio' }
] as const;

export default function Header({ selected }: HeaderProps = {}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determinar automaticamente a aba ativa com base na URL se não for fornecida explicitamente
  const activeTab =
    selected ??
    (() => {
      if (!pathname) return 'inicio';
      if (pathname.startsWith('/noticias')) return 'noticias';
      if (pathname.startsWith('/artigos')) return 'artigos';
      if (pathname.startsWith('/repositorio')) return 'repositorio';
      return 'inicio';
    })();

  const handleStartClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    const isActive = activeTab === path;
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
        className="fixed top-0 left-0 z-40 w-full bg-linear-to-b from-green-300/90 from-50% via-green-300/70 via-80% to-transparent px-3 py-0 text-green-300 md:relative md:p-5"
        aria-label="Navegação principal"
      >
        {/* ========================================================= */}
        {/* VERSÃO DESKTOP E TABLET (>= lg): Atalhos laterais e trapézio central */}
        {/* ========================================================= */}
        <div className="hidden lg:flex md:flex justify-between items-start text-center max-w-7xl mx-auto w-full">
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
              onClick={handleStartClick}
              className="w-72 xl:w-96 h-20 clip-trapezio bg-linear-to-b bg-gray-900 flex flex-col justify-center items-center group transition-transform hover:scale-105 active:scale-95"
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
        {/* VERSÃO MOBILE (< md): Logo grande centralizada   */}
        {/* e botão de abrir o menu de navegação                      */}
        {/* ========================================================= */}
        <div className="flex lg:hidden md:hidden justify-center items-center relative w-full max-w-7xl mx-auto px-2">
          {/* A logo fica menor em telas estreitas para não competir com o botão do menu. */}
          <Link
            href="/"
            onClick={handleStartClick}
            className="w-48 sm:w-60 md:w-80 h-20 clip-trapezio bg-linear-to-b bg-gray-900 flex flex-col justify-center items-center group transition-transform lg:hover:scale-105 active:opacity-80 lg:active:scale-95 shadow-lg shadow-black/50 touch-manipulation"
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
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-black text-green-300 clip-botao transition-all duration-200 ease-in-out lg:hover:scale-105 hover:cursor-pointer active:opacity-80 lg:active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5 touch-manipulation z-50 [&>*]:pointer-events-none"
            aria-label="Abrir menu de navegação"
            aria-expanded={isSidebarOpen}
            aria-controls="mobile-navigation"
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
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Painel do Menu Lateral */}
      <div
        id="mobile-navigation"
        className={`fixed top-0 left-0 h-full w-[75vw] sm:w-[50vw] bg-gray-900 border-r-2 border-green-500/30 z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Cabeçalho do menu lateral */}
        <div className="flex justify-between items-center p-5 border-b border-green-500/20">
          <div
            className="w-10 h-10 bg-green-300"
            style={{
              maskImage: `url('/icon.png')`,
              WebkitMaskImage: `url('/icon.png')`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat'
            }}
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-green-300 lg:hover:text-green-400 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg transition-colors touch-manipulation active:opacity-80 [&>*]:pointer-events-none"
            aria-label="Fechar menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Links de navegação */}
        <div className="flex flex-col p-4 gap-3 mt-4">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-lg font-bold tracking-wide transition-all duration-200 touch-manipulation active:opacity-80 [&>*]:pointer-events-none ${
                  isActive
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                    : 'text-green-200/80 lg:hover:bg-gray-800 lg:hover:text-green-300 border border-transparent'
                }`}
              >
                <span className="mr-3 text-green-500/60 font-mono">{'>'}</span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
