const { Model, DataTypes, Sequelize } = require('sequelize');

const TRACE_TABLE = 'traces';

const TraceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  timeFree: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  timeWork: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Trace extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TRACE_TABLE,
      modelName: 'Trace',
      timestamps: false,
    };
  }
}

module.exports = { TRACE_TABLE, TraceSchema, Trace };
