'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('cartItems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id'
        }
      },
      
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
     
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('cartItems');
     
  }
};
