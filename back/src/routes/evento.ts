// Importações

import express from 'express';
import eventoController from '../controllers/eventoController.js';
import auth from '../middlewares/auth.js';
import validateData from '../middlewares/validator.js';
import {
  CreateEventoSchema,
  UpdateEventoSchema
} from '../schemas/evento.schema.js';

// Configuração

const router = express.Router();

// Rotas públicas

router.get('/:id', eventoController.getEvento);
router.get('/', eventoController.getEventos);

// Rotas privadas

router.post(
  '/',
  auth,
  validateData(CreateEventoSchema),
  eventoController.createEvento
);
router.put(
  '/:id',
  auth,
  validateData(UpdateEventoSchema),
  eventoController.putEvento
);
router.delete('/:id', auth, eventoController.deleteEvento);

export default router;
