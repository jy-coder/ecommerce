const crypto = require('crypto');
const path = require('path');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require(path.join(__dirname,'./../models/user'))
const catchAsync = require(path.join(__dirname,'./../utils/catchAsync'))
const validator = require('validator')
const AppError = require(path.join(__dirname,'./../utils/AppError'))

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
 

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { password, confirmPassword} = req.body;

  const existingUser = await User.findOne({where:{email: req.body.email}})
  if(existingUser){
    return next(new AppError('User already exist!', 400));
  }

  if(!validator.equals(password,confirmPassword))
    return next(new AppError('Password does not match', 400));

  if(!existingUser){
   await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  const getUser = await User.findOne({where:{email: req.body.email}})
  await getUser.createCart()
}
  
  res.status(200).json({ status: 'success' });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({where: {email}})
  // console.log(user)

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});


exports.getUser = catchAsync(async (req,res,next) =>{
  const user = req.user;
  if(!user)
    return next(
      new AppError('Please login to get access', 401)
    );
  res.status(200).json({name: user.name, email:user.email, id:user.id});

})





