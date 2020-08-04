const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sequelize = require('./utils/database');
const adminRoute = require('./routes/adminRoute')
const shopRoute = require('./routes/shopRoute')
const userRoute = require('./routes/userRoute')
const Product = require('./models/product');
const User = require('./models/user');
const globalErrorHandler = require('./controllers/errorController')
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Review = require('./models/review');
const Category = require('./models/category');



global.__basedir = __dirname;

dotenv.config({ path: './config.env' });

const app = express();




app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
    withCredentials: true

    
}))

app.use(express.json())



const port = process.env.PORT || 1337;


app.use('/api/shop', shopRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)





//HANDLING ERROR

app.use(globalErrorHandler)



Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });



Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);

Product.belongsTo(Category)






sequelize
  // .sync({ force: true })
  .sync()
  .then(user => {
    // sequelize.drop()
    // Category.create({name: 'Pant'})
    // Category.create({name: 'Shirt'})
    // Category.create({name: 'Jean'})
    // Category.create({name: 'Skirt'})
    // User.create({name: 'test',email:'test@test.com',password: 'test'})
    // User.findOne({where:{email: 'test@test.com'}}).then(user =>user.createCart() )
    // getUser.createCart()
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
//  app.listen(port,'localhost');