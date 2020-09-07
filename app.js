const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const dotenv = require('dotenv');
const globalErrorHandler = require('./controllers/errorController')
const adminRoute = require('./routes/adminRoute')
const shopRoute = require('./routes/shopRoute')
const userRoute = require('./routes/userRoute')
const paymentRoute = require('./routes/paymentRoute')
const AppError = require('./utils/AppError');


// dotenv.config({ path: './config.env' });

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({origin: '*'}))


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



app.options('*',cors({origin: '*'}))
app.use('/api/shop', shopRoute)
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)
app.use('/api/payment', paymentRoute)


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

//HANDLING ERROR
app.listen(port,() =>{
      console.log(`App running on port ${port}`)
    });
app.use(globalErrorHandler)











