// Importações

import Sequelize from 'sequelize';
import pool from '../db/pool.js';

// Tabela

const JogoEvento = pool.define('jogo_evento', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

export default JogoEvento;
