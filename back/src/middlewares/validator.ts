// Importações

import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

// Middleware de validação

function validateData(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(' | ');
        throw new AppError(`Erro de validação -> ${errorMessages}`, 400);
      }
      throw err;
    }
  };
}

export default validateData;
