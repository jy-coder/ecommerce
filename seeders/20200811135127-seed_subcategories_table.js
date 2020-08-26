'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('subcategories', [
        {name:'Women Clothing', categoryId:1},
        {name:'Women Shoes', categoryId:1},
        {name:'Men Clothing', categoryId:2},
        {name:'Men Shoes', categoryId:2},
  
 
      ],{individualHooks: true})
    },
  

    down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('subcategories', null, {});
       
    }}
