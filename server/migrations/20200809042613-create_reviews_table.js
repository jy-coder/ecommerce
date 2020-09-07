'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type:Sequelize.INTEGER,
        allowNull: false,
        validate:{
          min: 0,
          max:5
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    
    })
  
    
    await queryInterface.addIndex('reviews', ['productId', 'userId']);
    
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('reviews');
    
  }
};
