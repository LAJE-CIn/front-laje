// Importações

import { Jogos, Eventos } from '../models/index.js';
import type { Jogo } from '../interfaces/Jogo.interface.js';
import type { Evento } from '../interfaces/Evento.interface.js';

// Querys

// Jogo
// Consultas
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

// Criação
async function createJogo(
  jogoData: Omit<Jogo, 'id' | 'eventos'>
): Promise<Jogo> {
  const novojogo = await Jogos.create(jogoData);
  return novojogo.toJSON() as Jogo;
}

// Atualização
async function putJogo(
  id: number,
  jogoData: Omit<Jogo, 'id' | 'eventos'>
): Promise<boolean> {
  const [linhasafetadas] = await Jogos.update(jogoData, { where: { id: id } });
  return linhasafetadas > 0;
}

// Deletar
async function deleteJogo(id: number): Promise<boolean> {
  const deletou = await Jogos.destroy({ where: { id: id } });
  return deletou > 0;
}

// Evento
//Consultas
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

// Criação

async function createEvento(
  eventoData: Omit<Evento, 'id' | 'lista'>
): Promise<Evento> {
  const novoEvento = await Eventos.create(eventoData);
  return novoEvento.toJSON() as Evento;
}

// Atualização

async function putEvento(
  id: number,
  eventoData: Omit<Evento, 'id' | 'lista'>
): Promise<boolean> {
  const [linhasafetadas] = await Eventos.update(eventoData, {
    where: { id: id }
  });

  return linhasafetadas > 0;
}

// Deletar

async function deleteEvento(id: number) {
  const deletou = await Eventos.destroy({ where: { id: id } });
  return deletou > 0;
}

export default {
  getJogoById,
  getJogos,
  createJogo,
  putJogo,
  deleteJogo,
  getEventoById,
  getEventos,
  createEvento,
  putEvento,
  deleteEvento
};
