'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in used!"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required!"
        },
        notNull: {
          args: true,
          msg: "Email is required!"
        },
        isEmail: {
          args: true,
          msg: "Wrong format email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required!"
        },
        notNull: {
          args: true,
          msg: "Password is required!"
        },
        isMinLength(value) {
          if (value.lenght < 5) throw new Error("Minimum passowrd length is 5")
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hashPass(instance.password)
  });

  return User;
};