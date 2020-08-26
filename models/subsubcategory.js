const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Subsubcategory = sequelize.define('subsubcategory', {
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
  }
},
{
    
indexes: [
    {
        unique: true,
        fields: ['name', 'subcategoryId'],
        allowNull: false
        
    }
],
  timestamps : false
 
});


module.exports = Subsubcategory;