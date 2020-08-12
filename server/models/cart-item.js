const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
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

module.exports = CartItem;
