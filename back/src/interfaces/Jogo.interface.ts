import type { Evento } from './Evento.interface.js';

interface Jogo {
  id: number;
  nome: string;
  participantes: string[];
  gênero: string;
  descrição: string;
  eventos?: Pick<Evento, 'id' & 'nome' & 'descrição'>[];
  link: string;
}

export type { Jogo };
