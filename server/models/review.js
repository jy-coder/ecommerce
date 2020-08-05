const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    // allowNull: false,
    primaryKey: true,
    // omitNull:true
  },
  text: Sequelize.STRING,
  rating: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      min: 0,
      max:5
    }

  }

},
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
