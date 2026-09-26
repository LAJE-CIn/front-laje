import Image from 'next/image';
import laje from './icon.png';
import Header from '@/components/shared/Header';
import BotãoGamer from '@/components/ui/BotãoGamer';

export default function Home() {
  return (
    <div>
      {/* Landing page */}
      <div className="w-full bg-linear-to-b from-green-300/90 from-30% via-green-300/70 via-40% to-transparent">
        <Header selected="inicio" />
        <div className="min-h-screen w-full text-center flex flex-col justify-center items-center gap-6 lg:gap-12 pt-28 sm:pt-32 lg:pt-36 px-4 bg-laje bg-no-repeat bg-bottom bg-contain lg:bg-cover [@media(min-aspect-ratio:16/9)]:bg-cover lg:bg-fixed">
          <div className="flex flex-col items-center text-center text-4xl font-sans">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2">
              Bem-Vindo à
            </h3>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight max-w-4xl">
              Liga Acadêmica
              <br />
              de Jogos Eletrônicos
            </h1>
            <div className="w-48 sm:w-80 h-px bg-gray-900/40 mt-6 md:mt-8"></div>
          </div>

          <BotãoGamer href="#sobre" texto="PRESS START" />
        </div>
      </div>

      {/* Sobre nós */}
      <div
        id="sobre"
        className="flex p-6 md:p-10 min-h-screen justify-center items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-12 max-w-6xl w-full px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:gap-8 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Quem somos?
            </h2>

            <p className="text-base sm:text-lg lg:text-2xl font-sans leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              reprehenderit odit delectus fugit sed, adipisci repudiandae rem
              dolorum, cupiditate quasi, unde similique dolor. Soluta voluptates
              adipisci cumque, ea perferendis placeat?
            </p>

            <p className="text-base sm:text-lg lg:text-xl font-sans leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              dolores modi voluptatum iure necessitatibus mollitia voluptatibus,
              commodi suscipit, sunt odio, ut minus doloribus eaque laborum
              molestiae quam maiores autem placeat.
            </p>

            <div className="mt-2 flex justify-center sm:justify-start">
              <BotãoGamer href="#site" texto="CONTINUE"></BotãoGamer>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={laje}
              alt="LAJE"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain bg-black rounded-3xl sm:rounded-4xl p-4"
            />
          </div>
        </div>
      </div>

      {/* Sobre o site */}
      <div
        id="site"
        className="flex p-6 md:p-10 min-h-screen justify-center items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 max-w-6xl w-full px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:gap-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-left leading-tight">
              Aqui você pode encontrar...
            </h3>
            <ul className="flex flex-col gap-4 lg:gap-6 text-lg lg:text-xl xl:text-2xl font-sans">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black shrink-0">
                  {'>'}
                </span>
                <span>
                  Últimas notícias da liga{' '}
                  <span className="text-gray-500 text-base lg:text-lg">
                    (em breve!)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black shrink-0">
                  {'>'}
                </span>
                <span>Todos os jogos e eventos que a LAJE esteve presente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black shrink-0">
                  {'>'}
                </span>
                <span>
                  Jogos da disciplina de Introdução à Programação (IP)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-black shrink-0">
                  {'>'}
                </span>
                <span>
                  Artigos produzidos pela liga{' '}
                  <span className="text-gray-500 text-base lg:text-lg">
                    (em breve!)
                  </span>
                </span>
              </li>
            </ul>
            <div className="mt-2 flex justify-center sm:justify-start">
              <BotãoGamer href="#site" texto="CONTINUE"></BotãoGamer>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={laje}
              alt="LAJE"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain bg-black rounded-3xl sm:rounded-4xl p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
