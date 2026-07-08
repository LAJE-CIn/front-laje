// Importações

import express from 'express';
import cors from 'cors';

// Configuração

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Inicialização do banco

// Rotas

export default app;
