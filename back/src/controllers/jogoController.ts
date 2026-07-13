// Importações

import type { Request, Response } from 'express';
import type { Jogo } from '../interfaces/Jogo.interface.js';
import query from '../db/query.js';
import { AppError } from '../utils/AppError.js';

// Controladores

async function getJogo(req: Request, res: Response): Promise<Response> {
  // Parâmetros
  // {id: number}

  const { id } = req.params;

  if (isNaN(Number(id))) {
    throw new AppError('ID deve ser um número!', 400);
  }

  const jogo: Jogo | null = await query.getJogoById(Number(id));

  if (!jogo) {
    throw new AppError('Jogo não existe ou não foi encontrado', 404);
  }

  return res.status(200).json({
    success: true,
    game: jogo
  });
}

async function getJogos(req: Request, res: Response): Promise<Response> {
  // Query
  // {limit: number, offset: number}
  const { limit, offset } = req.query;

  const jogos: Jogo[] = await query.getJogos(Number(limit), Number(offset));

  return res.status(200).json({
    success: true,
    games: jogos
  });
}

// Controladore POST

async function createJogo(req: Request, res: Response): Promise<Response> {
  // Body
  // {nome: string, participantes: string[], gênero: string, descrição: string, link: string}

  const jogoData: Omit<Jogo, 'id' | 'eventos'> = req.body;

  const jogo: Jogo = await query.createJogo(jogoData);

  return res.status(201).json({
    success: true,
    game: jogo
  });
}

// Controlador PUT

async function putJogo(req: Request, res: Response): Promise<Response> {
  // Params
  // {id: int}
  // Body
  // {...Jogo }

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new AppError('ID inválido.', 400);
  }

  const jogoData = req.body;

  const afetou = await query.putJogo(id, jogoData);

  if (!afetou) {
    throw new AppError('Jogo não encontrado', 404);
  }

  return res.status(200).json({
    success: true
  });
}

// Controlador DELETE
async function deleteJogo(req: Request, res: Response): Promise<Response> {
  // Params
  // {id: int}

  const id = Number(req.params.id);

  if (isNaN(id)) {
    throw new AppError('ID inválido.', 400);
  }

  const afetou = await query.deleteJogo(id);

  if (!afetou) {
    throw new AppError('Jogo não encontrado', 404);
  }

  return res.status(200).json({
    success: true
  });
}

export default {
  getJogo,
  getJogos,
  createJogo,
  putJogo,
  deleteJogo
};
