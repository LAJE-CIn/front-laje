// Importações

import { Jogos, Eventos } from '../models/index.js';
import type { Jogo, CreateJogo, UpdateJogo } from '../schemas/jogo.schema.js';
import type {
  Evento,
  CreateEvento,
  UpdateEvento
} from '../schemas/evento.schema.js';

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
async function createJogo(jogoData: CreateJogo): Promise<Jogo> {
  const novojogo = await Jogos.create(jogoData);
  return novojogo.toJSON() as Jogo;
}

// Atualização
async function putJogo(id: number, jogoData: UpdateJogo): Promise<boolean> {
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

async function createEvento(eventoData: CreateEvento): Promise<Evento> {
  const novoEvento = await Eventos.create(eventoData);
  return novoEvento.toJSON() as Evento;
}

// Atualização

async function putEvento(
  id: number,
  eventoData: UpdateEvento
): Promise<boolean> {
  const [linhasafetadas] = await Eventos.update(eventoData, {
    where: { id: id }
  });

  return linhasafetadas > 0;
}

// Deletar

async function deleteEvento(id: number): Promise<boolean> {
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
