import Header from '@/components/shared/Header';
import BotãoGamer from '@/components/ui/BotãoGamer';
import { FileCode, Wrench } from 'lucide-react';

export default function ArtigosPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header selected="artigos" />

      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-32 sm:pt-36 pb-16 text-center">
        <div className="max-w-2xl w-full bg-gray-900/90 border-4 border-green-500 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center w-20 h-20 bg-green-900/50 border-2 border-green-400 rounded-2xl">
            <FileCode className="w-10 h-10 text-green-400" />
            <Wrench className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-mono text-sm tracking-widest uppercase">
              [ WORK IN PROGRESS ]
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-wider">
              Artigos
            </h1>
            <h2 className="text-lg md:text-xl text-green-300 font-medium">
              Em Desenvolvimento
            </h2>
          </div>

          <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed font-sans">
            A área de publicações acadêmicas e artigos produzidos pela LAJE está em construção. Em breve disponibilizaremos nossas pesquisas e materiais de estudo por aqui!
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <BotãoGamer href="/" texto="PRESS START (INÍCIO)" />
          </div>
        </div>
      </div>
    </div>
  );
}
