'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Order)
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required!"
        },
        notNull: {
          args: true,
          msg: "Name is required!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required!"
        },
        notNull: {
          args: true,
          msg: "Price is required!"
        }
      }
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};