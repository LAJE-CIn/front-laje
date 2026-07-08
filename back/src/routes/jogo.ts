// Importações
import express from 'express';
import jogoController from '../controllers/jogoController.js';

// Congiguração

const router = express.Router();

// Rotas

router.get('/api/jogo/:id', jogoController.getJogo);
router.get('/api/jogos', jogoController.getJogos);

export default router;
