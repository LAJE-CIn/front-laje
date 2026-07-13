// Importações
import express from 'express';
import jogoController from '../controllers/jogoController.js';
import auth from '../middlewares/auth.js';

// Congiguração

const router = express.Router();

// Rotas públicas

router.get('/:id', jogoController.getJogo);
router.get('/', jogoController.getJogos);

// Rotas privadas

router.post('/', auth, jogoController.createJogo);
router.put('/:id', auth, jogoController.putJogo);
router.delete('/:id', auth, jogoController.deleteJogo);

export default router;
