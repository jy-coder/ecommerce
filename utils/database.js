const Sequelize = require('sequelize');


// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl: {
//     require: true,
//     rejectUnauthorized: false
//     }
//     }
// });


const sequelize = new Sequelize( 
  'ecommerce',
  'postgres',
  123456,
  {
    dialect: 'postgres',
  },
);




module.exports = sequelize;





