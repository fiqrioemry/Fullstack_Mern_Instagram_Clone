'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
      this.hasMany(models.Post, { foreignKey: 'userId' });
      this.hasMany(models.Like);
      this.hasMany(models.Comment, { foreignKey: 'userId' });

      this.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Followers',
        foreignKey: 'followingId',
      });

      this.belongsToMany(models.User, {
        through: models.Follow,
        as: 'Followings',
        foreignKey: 'followerId',
      });

      // 🔹 Relasi untuk Bookmark (User bisa menyimpan banyak post)
      this.hasMany(models.Bookmark, { foreignKey: 'userId', as: 'bookmarks' });

      // 🔹 Relasi untuk Notifikasi
      this.hasMany(models.Notification, {
        foreignKey: 'receiverId',
        as: 'notifications',
      });

      // 🔹 Relasi ke Chat
      this.hasMany(models.Chat, { foreignKey: 'user1_id', as: 'chat1' });
      this.hasMany(models.Chat, { foreignKey: 'user2_id', as: 'chat2' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
