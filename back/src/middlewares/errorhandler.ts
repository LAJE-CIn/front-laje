// Importações

import type { Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

// Middleware para gerenciar errors

function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response
): Response {
  const errorTime = new Date().toISOString();

  const isAppError = err instanceof AppError;
  const errorStatus = isAppError ? err.statusCode : 500;

  console.error(`[ERROR]: ${errorTime} - ${err.message}`);

  const responseMessage = isAppError ? err.message : 'Erro interno do servidor';

  return res.status(errorStatus).json({
    success: false,
    message: responseMessage
  });
}

export default errorHandler;
