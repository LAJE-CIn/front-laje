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

async function getEventoById(id: number): Promise<Evento | null> {
  const evento = await Eventos.findByPk(id, {
    include: [
      {
        model: Jogos,
        attributes: ['id', 'nome'],
        through: { attributes: [] }
      }
    ]
  });

  return evento ? (evento.toJSON() as Evento) : null;
}

async function getEventos(limit: number, offset: number): Promise<Evento[]> {
  const eventos = await Eventos.findAll({
    limit: limit,
    offset: offset
  });

  return eventos.map((evento) => evento.toJSON() as Evento);
}

export default {
  getJogoById,
  getJogos,
  getEventoById,
  getEventos
};
