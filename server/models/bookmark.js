'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      // 🔹 Setiap bookmark dikaitkan dengan user yang menyimpannya
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // 🔹 Setiap bookmark dikaitkan dengan post yang disimpan
      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
        onDelete: 'CASCADE',
      });
    }
  }

  Bookmark.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bookmark',
    },
  );

  return Bookmark;
};
