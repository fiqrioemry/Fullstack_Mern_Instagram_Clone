'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // 🔹 Like dikaitkan dengan User yang melakukan like
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'like' });

      // 🔹 Like bisa dikaitkan dengan Post
      this.belongsTo(models.Post, {
        foreignKey: 'entityId',
        constraints: false,
        onDelete: 'CASCADE',
        scope: { entityType: 'post' },
      });

      // 🔹 Like bisa dikaitkan dengan Comment (termasuk reply, karena reply adalah comment)
      this.belongsTo(models.Comment, {
        foreignKey: 'entityId',
        constraints: false,
        onDelete: 'CASCADE',
        scope: { entityType: 'comment' },
      });

      // 🔹 Like bisa menghasilkan Notifikasi
      this.hasOne(models.Notification, {
        foreignKey: 'entityId',
        constraints: false,
        scope: { entityType: 'like' },
        onDelete: 'CASCADE',
      });
    }
  }

  Like.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.ENUM('post', 'comment'),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    },
  );

  return Like;
};
