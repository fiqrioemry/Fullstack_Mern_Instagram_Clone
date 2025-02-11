'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'post' });
      this.hasMany(models.Like);
      this.hasMany(models.Comment);

      // 🔹 Relasi untuk Follow System
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
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
