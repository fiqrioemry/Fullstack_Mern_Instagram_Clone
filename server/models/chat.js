'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user1_id', as: 'user1' });
      this.belongsTo(models.User, { foreignKey: 'user2_id', as: 'user2' });
    }
  }

  Chat.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chat',
      tableName: 'chats',
      timestamps: true,
    },
  );

  return Chat;
};
