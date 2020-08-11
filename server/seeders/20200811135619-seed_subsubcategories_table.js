'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('subsubcategories', [
        {name:'Dresses', subcategoryId:1},
        {name:'Skirts', subcategoryId:1},
        {name:'Blouses', subcategoryId:1},
        {name:'Sneakers', subcategoryId:2},
        {name:'Heels', subcategoryId:2},
        {name:'T-Shirts', subcategoryId:3},
        {name:'Sneakers', subcategoryId:4},
        {name:'Formal Shoes', subcategoryId:4},


      
      ])
    },
  

    down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('subsubcategories', null, {});
       
    }}
