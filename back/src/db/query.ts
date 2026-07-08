// Importações

import { Jogos, Eventos } from '../models/index.js';
import type { Jogo } from '../interfaces/Jogo.interface.js';
import type { Evento } from '../interfaces/Evento.interface.js';

// Querys

// Jogo

async function getJogoById(id: number): Promise<Jogo | null> {
  const jogo = await Jogos.findByPk(id, {
    include: [
      {
        model: Eventos,
        attributes: ['id', 'nome'],
        through: { attributes: [] }
      }
    ]
  });

  return jogo ? (jogo.toJSON() as Jogo) : null;
}

async function getJogos(limit: number, offset: number): Promise<Jogo[]> {
  const jogos = await Jogos.findAll({
    limit: limit,
    offset: offset
  });

  return jogos.map((jogo) => jogo.toJSON() as Jogo);
}

// Evento

export default {
  getJogoById,
  getJogos
};
