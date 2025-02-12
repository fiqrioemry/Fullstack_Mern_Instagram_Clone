'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Like, {
        foreignKey: 'entityId',
        as: 'like',
        constraints: false,
        onDelete: 'CASCADE',
        scope: {
          entityType: 'post',
        },
      });

      this.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comment',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.PostGallery, {
        foreignKey: 'postId',
        as: 'gallery',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // 🔹 Relasi untuk Bookmark (Post bisa disimpan oleh banyak user)
      this.hasMany(models.Bookmark, {
        foreignKey: 'postId',
        as: 'bookmarkedBy',
      });

      // 🔹 Relasi untuk Notifikasi (Jika post mendapat like/comment)
      this.hasMany(models.Notification, {
        foreignKey: 'postId',
        as: 'notifications',
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
