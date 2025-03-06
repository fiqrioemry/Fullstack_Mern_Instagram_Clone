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

      this.belongsTo(models.User, { as: 'user' });

      this.hasMany(models.Bookmark, {
        foreignKey: 'postId',
        as: 'bookmarkedBy',
      });

      this.hasMany(models.Notification, {
        foreignKey: 'postId',
        as: 'notifications',
      });

      // fix
      this.hasMany(models.PostGallery, {
        as: 'gallery',
        onDelete: 'CASCADE',
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
