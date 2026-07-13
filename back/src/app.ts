// Importações
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { pool } from './models/index.js';

import jogoRouter from './routes/jogo.js';
import eventoRouter from './routes/evento.js';
import errorHandler from './middlewares/errorhandler.js';

// Configuração

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Inicialização do banco

await pool.sync();

// Rotas

app.use('/api/jogos', jogoRouter);
app.use('/api/eventos', eventoRouter);
app.use(errorHandler);
export default app;
