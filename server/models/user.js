const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    unique: true,
    type:Sequelize.STRING
  },
  password: Sequelize.STRING
  
}, 
{
  hooks: {
    beforeCreate: async (user) => {
       user.password = await bcrypt.hash(user.password, 12);
    }
  }  
}
);



User.prototype.correctPassword = async function(candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};



module.exports = User;
