import Link from 'next/link';
import Image from 'next/image';
import laje from './icon.png';
import Header from '@/components/shared/Header';
import BotãoGamer from '@/components/ui/BotãoGamer';

export default function Home() {
  return (
    <div>
      <Header selected="inicio"></Header>
      {/* Landing page */}

      <div className="bg-linear-to-b from-green-300/90 from-30% via-green-300/70 via-40% to-transparent">
        <div className="min-h-screen text-center flex flex-col justify-center items-center gap-10 bg-laje bg-fixed">
          <div className="flex flex-col items-center text-center text-4xl font-sans">
            <h3 className="text-3xl font-medium mb-1">Bem-Vindo à</h3>
            <h1 className="text-5xl font-black leading-tight">
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
        className="flex p-10 min-h-screen justify-center items-center text-justify gap-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-7">
            <h3 className="text-5xl font-black">Quem somos?</h3>

            <p className="text-3xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              reprehenderit odit delectus fugit sed, adipisci repudiandae rem
              dolorum, cupiditate quasi, unde similique dolor. Soluta voluptates
              adipisci cumque, ea perferendis placeat?
            </p>

            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              dolores modi voluptatum iure necessitatibus mollitia voluptatibus,
              commodi suscipit, sunt odio, ut minus doloribus eaque laborum
              molestiae quam maiores autem placeat.
            </div>

            <div>
              <BotãoGamer href="#site" texto="CONTINUE"></BotãoGamer>
            </div>
          </div>
          <div className="flex md:justify-center">
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
        className="flex p-10 min-h-screen justify-center items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-10">
            <h3 className="text-5xl font-black">Aqui você pode encontrar...</h3>
            <ul className="flex flex-col gap-6 text-xl md:text-2xl">
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
            <div>
              <BotãoGamer href="#" texto="RESTART"></BotãoGamer>
            </div>
          </div>
          <div className="flex justify-center">
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
