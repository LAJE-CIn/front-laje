import Image from 'next/image';
import laje from './icon.png';
import Header from '@/components/shared/Header';
import BotãoGamer from '@/components/ui/BotãoGamer';

export default function Home() {
  return (
    <div>
      {/* Landing page */}
      <div className="bg-linear-to-b from-green-300/90 from-30% via-green-300/70 via-40% to-transparent">
        <div className="fixed w-full z-10">
          <Header selected="inicio"></Header>
        </div>
        <div className="min-h-screen text-center flex flex-col justify-center items-center gap-10 bg-laje bg-fixed">
          <div className="flex flex-col items-center text-center text-4xl font-sans">
            <h3 className="text-2xl md:text-3xl font-medium mb-1">
              Bem-Vindo à
            </h3>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              Liga Acadêmica
              <br />
              de Jogos Eletrônicos
            </h1>
            <div className="w-80 h-px bg-gray-900/40 mt-8"></div>
          </div>

          <BotãoGamer href="#sobre" texto="PRESS START" />
        </div>
      </div>

      {/* Sobre nós */}
      <div
        id="sobre"
        className="flex p-6 md:p-10 min-h-screen justify-center items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 max-w-6xl w-full">
          <div className="flex flex-col gap-6 md:gap-8 text-justify">
            <h3 className="text-3xl md:text-5xl font-black text-left leading-tight">
              Quem somos?
            </h3>

            <p className="text-lg md:text-2xl font-sans">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              reprehenderit odit delectus fugit sed, adipisci repudiandae rem
              dolorum, cupiditate quasi, unde similique dolor. Soluta voluptates
              adipisci cumque, ea perferendis placeat?
            </p>

            <div className="text-base md:text-xl font-sans">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              dolores modi voluptatum iure necessitatibus mollitia voluptatibus,
              commodi suscipit, sunt odio, ut minus doloribus eaque laborum
              molestiae quam maiores autem placeat.
            </div>

            <div className="mt-2 flex justify-start">
              <BotãoGamer href="#site" texto="CONTINUE"></BotãoGamer>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={laje}
              alt="LAJE"
              className="w-64 md:w-96 object-contain bg-black rounded-4xl p-4"
            />
          </div>
        </div>
      </div>

      {/* Sobre o site */}
      <div
        id="site"
        className="flex p-6 md:p-10 min-h-screen justify-center items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 max-w-6xl w-full">
          <div className="flex flex-col gap-6 md:gap-8">
            <h3 className="text-3xl md:text-5xl font-black text-left leading-tight">
              Aqui você pode encontrar...
            </h3>
            <ul className="flex flex-col gap-4 md:gap-6 text-lg md:text-2xl font-sans">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black">{'>'}</span>
                Últimas notícias da liga
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black">{'>'}</span>
                Todos os jogos e eventos que a LAJE esteve presente
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black">{'>'}</span>
                Jogos da disciplina de Introdução à Programação (IP)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black">{'>'}</span>
                Artigos produzidos pela liga (em breve!)
              </li>
            </ul>
            <div className="mt-2 flex justify-start">
              <BotãoGamer href="#" texto="RESTART"></BotãoGamer>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={laje}
              alt="LAJE"
              className="w-64 md:w-96 object-contain bg-black rounded-4xl p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
