const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product',  {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId:{
     type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
  },
  subsubcategoryId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'subsubcategories',
      key: 'id'
    }

  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});





module.exports = Product;
