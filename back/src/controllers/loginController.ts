// Importações

import type { Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import jwt from 'jsonwebtoken';

function checkLogin(req: Request, res: Response): Response {
  // Body
  // {user: string, password:string}

  const { user, password } = req.body;

  if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ login: true }, process.env.SECRET as string, {
      expiresIn: '1 day'
    });
    return res.status(200).json({
      success: true,
      message: 'Usuário autenticado',
      token: token
    });
  }

  throw new AppError('Usuário ou senha incorretos.', 401);
}

export default {
  checkLogin
};
