const { Model, DataTypes, Sequelize } = require('sequelize');

const RECORD_TABLE = 'records';

const RecordSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  activityId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Record extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECORD_TABLE,
      modelName: 'Record',
      timestamps: false,
    };
  }
}

module.exports = { RECORD_TABLE, RecordSchema, Record };
