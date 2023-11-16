'use strict';
const fs = require('fs');
const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = fs.readFileSync('./data/items.json', 'utf-8');

    items = JSON.parse(items);

    items.forEach(item => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    });

    await queryInterface.bulkInsert("Items", items);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  }
};
