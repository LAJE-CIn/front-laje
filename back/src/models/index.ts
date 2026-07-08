// Importações

import pool from '../db/pool.js';
import Jogos from './Jogos.model.js';
import Eventos from './Eventos.model.js';
import JogosEventos from './JogosEventos.model.js';

// Relacionamentos Jogos - Eventos

Jogos.belongsToMany(Eventos, {
  through: JogosEventos,
  foreignKey: 'jogo_id',
  constraints: true
});

Eventos.belongsToMany(Jogos, {
  through: JogosEventos,
  foreignKey: 'evento_id',
  constraints: true
});

export { pool, Jogos, Eventos, JogosEventos };
