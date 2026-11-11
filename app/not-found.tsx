import Image from 'next/image';
import BotãoGamer from '@/components/ui/BotãoGamer';
import PageContainer from '@/components/shared/PageContainer';
import laje from './icon.png';

export default function NotFound() {
  return (
    <PageContainer size="centered">
      <div className="max-w-2xl w-full bg-gray-900/90 border-4 border-green-500 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex flex-col items-center gap-6">
        <div className="flex justify-center">
          <Image
            src={laje}
            alt="LAJE"
            className="w-24 md:w-32 object-contain bg-black rounded-3xl p-2 border-2 border-green-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-green-400 font-mono text-sm tracking-widest uppercase">
            [ ERROR 404 ]
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider">
            GAME OVER
          </h1>
          <h2 className="text-xl md:text-2xl text-green-300 font-medium">
            Página Não Encontrada
          </h2>
        </div>

        <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed font-sans">
          Você explorou além do mapa! A página que você tentou acessar não existe, foi removida ou mudou de endereço.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <BotãoGamer href="/" texto="PRESS START (INÍCIO)" />
        </div>
      </div>
    </PageContainer>
  );
}
