// Importações

import type { Request, Response } from 'express';
import type { Evento } from '../interfaces/Evento.interface.js';
import query from '../db/query.js';
import { AppError } from '../utils/AppError.js';

// Controladores GET

async function getEvento(req: Request, res: Response): Promise<Response> {
  // Parâmetros
  // {id: number}

  const { id } = req.params;

  if (isNaN(Number(id))) {
    throw new AppError('ID deve ser um número!', 400);
  }

  const evento: Evento | null = await query.getEventoById(Number(id));

  if (!evento) {
    throw new AppError('Evento não existe ou não foi encontrado', 404);
  }

  return res.status(200).json({
    success: true,
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
    success: true,
    events: eventos
  });
}

// Controladore POST

async function createEvento(req: Request, res: Response): Promise<Response> {
  // Body
  // {nome: string, tipo: string, descrição: string, periodo: { inicio: Date, fim: Date }}

  const eventoData: Omit<Evento, 'id' | 'lista'> = req.body;

  const evento: Evento = await query.createEvento(eventoData);

  return res.status(201).json({
    success: true,
    event: evento
  });
}

// Controlador PUT

async function putEvento(req: Request, res: Response): Promise<Response> {
  // Params
  // {id: int}
  // Body
  // {...Evento }

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new AppError('ID inválido.', 400);
  }

  const eventoData = req.body;

  const afetou = await query.putEvento(id, eventoData);

  if (!afetou) {
    throw new AppError('Evento não encontrado', 404);
  }

  return res.status(200).json({
    success: true
  });
}

// Controlador DELETE
async function deleteEvento(req: Request, res: Response): Promise<Response> {
  // Params
  // {id: int}

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new AppError('ID inválido.', 400);
  }

  const afetou = await query.deleteEvento(id);

  if (!afetou) {
    throw new AppError('Evento não encontrado', 404);
  }

  return res.status(200).json({
    success: true
  });
}

export default {
  getEvento,
  getEventos,
  createEvento,
  putEvento,
  deleteEvento
};
