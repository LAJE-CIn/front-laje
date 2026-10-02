import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ExternalLink } from 'lucide-react';
import brasaoUfpe from '@/assets/logos/Brasão_da_UFPE.png';
import cinLogo from '@/assets/logos/cinlogo.png';
import lajeLogo from '@/app/icon.png';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Artigos', href: '/artigos' },
    { label: 'Repositório', href: '/repositorio' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Jogos', href: '/repositorio/jogos' },
    { label: 'Coleções', href: '/repositorio/colecoes' }
  ];

  return (
    <footer className="w-full bg-gray-950 text-gray-300 border-t-2 border-green-500/40 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Linha decorativa de neon gamer */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-green-400/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Coluna 1: Identidade da LAJE e Redes Sociais */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black rounded-xl p-1.5 border-2 border-green-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <Image
                  src={lajeLogo}
                  alt="Logo da LAJE"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-wider text-white">
                  LAJE
                </span>
                <span className="text-xs text-green-300 font-mono tracking-wide">
                  Liga Acadêmica de Jogos
                </span>
              </div>
            </div>

            <p className="text-sm font-sans text-gray-400 leading-relaxed">
              Conectando arte e tecnologia para o desenvolvimento de jogos no Centro de Informática da UFPE.
            </p>

            {/* Redes Sociais */}
            <div className="mt-2 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-green-400 uppercase">
                Redes Sociais
              </span>
              <a
                href="https://www.instagram.com/laje.ufpe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-900 border border-green-500/30 text-green-300 hover:text-green-200 hover:border-green-400 hover:bg-gray-850 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all group w-fit"
                aria-label="Instagram da LAJE (@laje.ufpe)"
              >
                <InstagramIcon className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-mono text-sm font-bold">@laje.ufpe</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-400 transition-colors ml-1" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Filiação Institucional (UFPE & CIn) */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold tracking-widest text-green-400 uppercase">
                Institucional
              </span>
              <h4 className="text-lg font-bold text-white tracking-wide">
                Apoio e Filiação
              </h4>
            </div>

            <p className="text-xs font-sans text-gray-400">
              Iniciativa vinculada ao Centro de Informática da Universidade Federal de Pernambuco.
            </p>

            <div className="flex flex-col gap-3">
              {/* Card UFPE */}
              <a
                href="https://www.ufpe.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-green-500/50 hover:bg-gray-850 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all group"
              >
                <div className="w-11 h-11 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                  <Image
                    src={brasaoUfpe}
                    alt="Brasão da UFPE"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-bold text-sm group-hover:text-green-300 transition-colors">
                    UFPE
                  </span>
                  <span className="text-gray-400 text-xs font-sans truncate">
                    Universidade Federal de Pernambuco
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-400 transition-colors ml-auto shrink-0" />
              </a>

              {/* Card CIn */}
              <a
                href="https://www.cin.ufpe.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-900/90 border border-gray-800 hover:border-green-500/50 hover:bg-gray-850 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all group"
              >
                <div className="w-11 h-11 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                  <Image
                    src={cinLogo}
                    alt="Logo do CIn - Centro de Informática"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-bold text-sm group-hover:text-green-300 transition-colors">
                    CIn - UFPE
                  </span>
                  <span className="text-gray-400 text-xs font-sans truncate">
                    Centro de Informática
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-400 transition-colors ml-auto shrink-0" />
              </a>
            </div>
          </div>

          {/* Coluna 3: Localização & Endereço */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold tracking-widest text-green-400 uppercase">
                Endereço
              </span>
              <h4 className="text-lg font-bold text-white tracking-wide">
                Localização
              </h4>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/60 border border-gray-850">
              <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <address className="not-italic font-sans text-xs sm:text-sm text-gray-300 space-y-1 leading-relaxed">
                <p className="font-bold text-white font-mono">
                  Centro de Informática (CIn)
                </p>
                <p>Av. Jornalista Aníbal Fernandes, s/n</p>
                <p>Cidade Universitária</p>
                <p className="text-gray-400">Recife - PE | CEP 50740-560</p>
              </address>
            </div>

            <a
              href="https://maps.google.com/?q=Centro+de+Informatica+UFPE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-green-400 hover:text-green-300 transition-colors w-fit"
            >
              <span>Abrir no Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Coluna 4: Navegação Rápida */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold tracking-widest text-green-400 uppercase">
                Atalhos
              </span>
              <h4 className="text-lg font-bold text-white tracking-wide">
                Navegação
              </h4>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 font-mono text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center py-1 text-gray-400 hover:text-green-300 transition-colors group"
                  >
                    <span className="text-green-500 font-bold mr-1.5 transition-transform group-hover:translate-x-1">
                      {'>'}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra inferior: Direitos e Tagline */}
        <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
          <p className="text-center sm:text-left">
            © {currentYear} <span className="font-bold text-gray-400">LAJE</span> (Liga Acadêmica de Jogos Eletrônicos) — Centro de Informática / UFPE.
          </p>
          <div className="flex items-center gap-2 font-mono text-green-400/80 text-[11px] bg-gray-900 px-3 py-1 rounded-full border border-green-500/20">
            <span>PRESS START TO PLAY</span>
            <span>👾</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
