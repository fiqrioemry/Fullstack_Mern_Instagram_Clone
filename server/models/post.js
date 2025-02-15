'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Like, {
        foreignKey: 'entityId',
        as: 'likes',
        constraints: false,
        onDelete: 'CASCADE',
        scope: {
          entityType: 'post',
        },
      });

      this.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.PostGallery, {
        foreignKey: 'postId',
        as: 'gallery',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      this.hasMany(models.Bookmark, {
        foreignKey: 'postId',
        as: 'bookmarkedBy',
      });

      this.hasMany(models.Notification, {
        foreignKey: 'postId',
        as: 'notifications',
      });
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
