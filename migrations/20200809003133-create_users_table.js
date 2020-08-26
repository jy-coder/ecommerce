'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

  await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type:Sequelize.STRING,
        allowNull: false
      },
      email: {
        unique: true,
        type:Sequelize.STRING,
        allowNull: false
      },
      password: {
        type:Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
      
    });
  
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
    
  }
};
