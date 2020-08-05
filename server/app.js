const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const compression = require('compression');
const dotenv = require('dotenv');
const globalErrorHandler = require('./controllers/errorController')
const sequelize = require('./utils/database')
const adminRoute = require('./routes/adminRoute')
const shopRoute = require('./routes/shopRoute')
const userRoute = require('./routes/userRoute')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
const Review = require('./models/review')
const Category = require('./models/category')
const serveStatic = require('serve-static')
const AppError = require('./utils/AppError');


dotenv.config({ path: './config.env' });

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors())


app.use(compression())

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'limit',
      'category',
      'sortBy',
      'orderBy'
    ]
  })
);

const port = process.env.PORT || 1337;

app.options('*',cors())
app.use('/api/shop', shopRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)


if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



//Handing Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


//HANDLING ERROR

app.use(globalErrorHandler)


//Establish models r/s before syncing
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
    // console.log(__dirname)
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