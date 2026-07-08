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
      allowNull: false,
      field: 'periodo_inicio'
    },
    periodoFim: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'periodo_fim'
    }
  },
  {
    timestamps: false
  }
);

export default Eventos;
