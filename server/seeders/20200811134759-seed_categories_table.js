'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('categories', [
        {name: 'Women\'s Fashion'},
        {name: 'Men\'s Fashion'}
 
      ])
    },
  

    down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('categories', null, {});
       
    }}