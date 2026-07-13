// Importações

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

// Middleware de autenticação

function autenticarLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw new AppError('Não autorizado.', 401);

  try {
    jwt.verify(token, process.env.SECRET as string);
    return next();
  } catch {
    throw new AppError('Não autorizado', 401);
  }
}

export default autenticarLogin;
