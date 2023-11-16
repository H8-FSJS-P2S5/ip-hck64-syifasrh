'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey: "UserId"})
      Order.belongsTo(models.Item, {foreignKey: "ItemId"})
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "City is required!"
        },
        notNull: {
          args: true,
          msg: "City is required!"
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Province is required!"
        },
        notNull: {
          args: true,
          msg: "Province is required!"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Address is required!"
        },
        notNull: {
          args: true,
          msg: "Address is required!"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Quantity is required!"
        },
        notNull: {
          args: true,
          msg: "Quantity is required!"
        }
      }
    },
    shippingFee: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};