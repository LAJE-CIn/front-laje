import Sequelize from 'sequelize';
import pool from '../db/pool.js';

const Eventos = pool.define(
  'eventos',
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
    tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descrição: {
      type: Sequelize.STRING,
      allowNull: false
    },
    periodoInicio: {
      type: Sequelize.DATE,
      allowNull: false
    },
    periodoFim: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default Eventos;
