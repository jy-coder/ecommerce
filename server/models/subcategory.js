const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Subcategory= sequelize.define('subcategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:   Sequelize.STRING,
    allowNull: false,
  }
},
{
    
indexes: [
    {
        unique: true,
        fields: ['name', 'categoryId'],
        allowNull: false
        
    }
],
    
  timestamps: false
  
}
);

module.exports = Subcategory;