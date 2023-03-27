const { Model, DataTypes } = require('sequelize');

const ACTIVITY_TABLE = 'activities';

const ActivitySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
};

class Activity extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACTIVITY_TABLE,
      modelName: 'Activity',
      timestamps: false,
    };
  }
}

module.exports = { ACTIVITY_TABLE, ActivitySchema, Activity };
