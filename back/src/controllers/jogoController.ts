// Importações

import type { Request, Response } from 'express';
import type { Jogo } from '../interfaces/Jogo.interface.js';
import query from '../db/query.js';

// Controladores

async function getJogo(req: Request, res: Response): Promise<Response> {
  // Parâmetros
  // {id: number}

  const { id } = req.params;

  const jogo: Jogo = await query.getJogoById(Number(id));

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

export default {
  getJogo,
  getJogos
};
