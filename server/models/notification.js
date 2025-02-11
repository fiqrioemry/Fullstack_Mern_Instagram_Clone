'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });

      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    }
  }

  Notification.init(
    {
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('like', 'comment', 'follow', 'mention', 'message'),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
    },
  );

  return Notification;
};
