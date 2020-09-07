'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subsubcategories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type:   Sequelize.STRING,
        allowNull: false,
      },
    
      subcategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subcategories',
          key: 'id'
      }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })

  await queryInterface.addIndex('subsubcategories', ['name', 'subcategoryId']);
},

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('subsubcategories');
     
  }
};
