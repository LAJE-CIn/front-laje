// Importações

import Sequelize from 'sequelize';
import pool from '../db/pool.js';

// Tabela

const Jogos = pool.define(
  'jogos',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    participantes: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    gênero: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descrição: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default Jogos;
