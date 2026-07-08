import type { Jogo } from './Jogo.interface.js';

interface Evento {
  id: number;
  nome: string;
  tipo: string;
  descrição: string;
  lista?: Pick<Jogo, 'id' & 'nome' & 'descrição'>[];
  periodo: {
    inicio: Date;
    fim: Date;
  };
}

export type { Evento };
