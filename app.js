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
const globalErrorHandler = require(path.join(__dirname,'./controllers/errorController'))
const sequelize = require(path.join(__dirname,'./utils/database'))
const adminRoute = require(path.join(__dirname,'./routes/adminRoute'))
const shopRoute = require(path.join(__dirname,'./routes/shopRoute'))
const userRoute = require(path.join(__dirname,'./routes/userRoute'))
const Product = require(path.join(__dirname,'./models/product'))
const User = require(path.join(__dirname,'./models/user'))
const Cart = require(path.join(__dirname,'./models/cart'))
const CartItem = require(path.join(__dirname,'./models/cart-item'))
const Order = require(path.join(__dirname,'./models/order'))
const OrderItem = require(path.join(__dirname,'./models/order-item'))
const Review = require(path.join(__dirname,'./models/review'))
const Category = require(path.join(__dirname,'./models/category'))
const serveStatic = require('serve-static')



// global.__basedir = __dirname;

dotenv.config({ path: './config.env' });

const app = express();




app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
    withCredentials: true

    
}))

app.use(serveStatic(__dirname + '/client/public'))
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


app.use('/api/shop', shopRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)

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