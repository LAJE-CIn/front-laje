// Importações
import express from 'express';
import eventoController from '../controllers/eventoController.js';

// Configuração

const router = express.Router();

// Rotas

router.get('api/evento/:id', eventoController.getEvento);
router.get('api/eventos', eventoController.getEventos);

export default router;
