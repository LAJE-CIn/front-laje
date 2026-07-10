// Importações

import express from 'express';
import cors from 'cors';
import jogoRoutes from './controllers/jogoController.js';
import eventoRoutes from './controllers/eventoController.js';

// Configuração

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Inicialização do banco

// Rotas

app.use('/', jogoRoutes);
app.use('/', eventoRoutes);
export default app;
