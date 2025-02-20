'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
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
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
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
