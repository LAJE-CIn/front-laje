import type { Request, Response } from 'express';
import type { Jogo } from '../interfaces/Jogo.interface.js';
import type { Evento } from '../interfaces/Evento.interface.js';
import query from '../db/query.js';

// controladores

async function getEvento(req: Request, res: Response): Promise<Response> {
  // Parâmetros
  // {id: number}

  const { id } = req.params;

  const evento: Evento = await query.getEventoById(Number(id));

  return res.status(200).json({
    sucess: true,
    event: evento
  });
}

async function getEventos(req: Request, res: Response): Promise<Response> {
  // Query
  // {limit: number, offset: number}

  const { limit, offset } = req.query;

  const eventos: Evento[] = await query.getEventos(
    Number(limit),
    Number(offset)
  );

  return res.status(200).json({
    sucess: true,
    events: eventos
  });
}

export default {
  getEvento,
  getEventos
};
