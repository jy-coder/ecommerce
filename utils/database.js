const Sequelize = require('sequelize');


sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
  }
});
// const sequelize = new Sequelize( 
//     'ecommerce',
//     'postgres',
//     123456,
//     {
//       dialect: 'postgres',
//     },
// );



module.exports = sequelize;





