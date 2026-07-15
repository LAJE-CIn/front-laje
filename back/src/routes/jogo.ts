// Importações
import express from 'express';
import jogoController from '../controllers/jogoController.js';
import auth from '../middlewares/auth.js';
import { CreateJogoSchema, UpdateJogoSchema } from '../schemas/jogo.schema.js';
import validateData from '../middlewares/validator.js';

// Configuração

const router = express.Router();

// Rotas públicas

router.get('/:id', jogoController.getJogo);
router.get('/', jogoController.getJogos);

// Rotas privadas

router.post(
  '/',
  auth,
  validateData(CreateJogoSchema),
  jogoController.createJogo
);
router.put(
  '/:id',
  auth,
  validateData(UpdateJogoSchema),
  jogoController.putJogo
);
router.delete('/:id', auth, jogoController.deleteJogo);

export default router;
