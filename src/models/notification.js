"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      userID: DataTypes.INTEGER,
      content: DataTypes.STRING,
      isRead: DataTypes.STRING,
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
