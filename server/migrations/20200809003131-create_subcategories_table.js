'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('subcategories', {
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
      //manually added (seq problem)
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
      }
    },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
      
    
  })
  
  await queryInterface.addIndex('subcategories', ['name', 'categoryId']);
  
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('subcategories');
    
  }
};
