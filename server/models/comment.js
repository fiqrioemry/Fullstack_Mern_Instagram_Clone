'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user' });
      this.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Comment, {
        as: 'parent',
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Comment, {
        as: 'replies',
        foreignKey: 'parentId',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.Like, {
        foreignKey: 'entityId',
        constraints: false,
        onDelete: 'CASCADE',
        scope: {
          entityType: 'comment',
        },
      });

      // 🔹 Relasi untuk Notifikasi (Jika ada user yang mention atau reply)
      this.hasMany(models.Notification, {
        foreignKey: 'commentId',
        as: 'notifications',
      });
    }
  }

  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );

  return Comment;
};
