const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Review = sequelize.define('review', {
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
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    
}},
{
    indexes: [
        {
            unique: true,
            fields: ['productId', 'userId'],
            allowNull: false
            
        }
    ]
}




);

module.exports = Review;
