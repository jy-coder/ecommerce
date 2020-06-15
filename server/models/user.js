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
  email: Sequelize.STRING,
  // password: Sequelize.STRING,
  
}, 
// {
//   hooks: {
//     beforeCreate: async () => {
//       user.password = await bcrypt.hash(this.password, 12);
//     }
//   },
//   instanceMethods: {
//     validPassword: async function(candidatePassword,userPassword) {
//       return await bcrypt.compare(candidatePassword, userPassword);
//     }
//   }    
// }
);



module.exports = User;
