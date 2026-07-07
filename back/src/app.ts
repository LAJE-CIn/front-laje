// Importações

import express from 'express';
import cors from 'cors';

// Configuração

const app = express();
app.use(express.json());
app.use(cors());

export default app;
