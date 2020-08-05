const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Category= sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:   Sequelize.ENUM,
    allowNull: false,
    values: ['Shirt', 'Pant','Dress','Jean','Skirt']
  }
},
{
  timestamps: false
}
);

module.exports = Category;