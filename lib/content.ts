import 'server-only'; // O conteúdo de #site/content pode ficar bem grande, então tem que ficar contido no server ou na build.
import { eventos, jogos } from '#site/content';
import type { Evento, Jogo } from '#site/content';
export type { Evento, Jogo } from '#site/content';
export type Conteudo = Evento | Jogo;

export async function getEventosOrdenados() {
  return Array.from(await getEventos()).sort(
    (a, b) =>
      new Date(a.dataPublicacao).getTime() -
      new Date(b.dataPublicacao).getTime()
  );
}

export async function getEventos(): Promise<Evento[]> {
  return eventos.map(({ ...evento }) => evento);
}

export async function getEvento(
  slug: string
): Promise<(Omit<Evento, 'jogos'> & { jogos: Jogo[] }) | undefined> {
  const evento = eventos.find((evento) => evento.slug === slug);
  if (!evento) {
    return undefined;
  }

  return {
    ...evento,
    jogos: (await getJogos()).filter((jogo) =>
      jogo.eventos.some((e) => e.slug === slug)
    )
  };
}

export async function getJogos(): Promise<Jogo[]> {
  return jogos.map(({ ...jogo }) => jogo);
}

export async function getJogo(
  slug: string,
  incluirEventos: boolean
): Promise<(Jogo & { eventosData?: Evento[] }) | undefined> {
  const jogo = (await getJogos()).find((jogo) => jogo.slug === slug);
  if (!jogo) return jogo;

  return {
    ...jogo,
    eventosData: incluirEventos
      ? (await getEventos()).filter((evento) =>
          jogo.eventos.some((e) => e.slug === evento.slug)
        )
      : undefined
  };
}
