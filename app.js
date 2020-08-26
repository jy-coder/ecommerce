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
const AppError = require('./utils/AppError');
const Subcategory = require('./models/subcategory')
const Subsubcategory = require('./models/subsubcategory')
const Category = require('./models/category')

// dotenv.config({ path: './config.env' });

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: true }))


// app.use(compression())

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

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



app.options('*',cors({ origin: true }))
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

//execute function once to test using create method
//before seeding database
require('./utils/initialize')()



//sequelize migration:create --name create_products_table
//sequelize db:migrate
//sequelize db:migrate:undo:all
//sequelize seed:create --name seed_products_table
//sequelize db:seed:all
//sequelize db:seed:undo:all








//HANDLING ERROR
app.listen(port,() =>{
      console.log(`App running on port ${port}`)
    });
app.use(globalErrorHandler)











