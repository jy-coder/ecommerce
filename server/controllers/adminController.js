const Product = require('../models/product')
const User= require('../models/user')
const Review= require('../models/review')
const Sequelize = require('sequelize');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostPhoto = upload.single('imageUrl');

exports.resizePostPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${req.user.id}-${Date.now()}.jpeg`;
  filePath = path.join(__basedir ,`../client/public/${req.file.filename}`)
  await sharp(req.file.buffer)
    .resize(200 ,200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filePath);

  next();
});




exports.addProduct = catchAsync (async (req, res, next)  => {
if(req.file)
    req.body.imageUrl= req.file.filename

    const {title,imageUrl,price,description} = req.body;


    const product =await req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    });


    if(!product)
        return next(new AppError('No product found', 404));

        return res.status(200).json(product)
     
  })


  exports.deleteProduct = catchAsync (async (req, res, next)  => {

    let checkUser =  req.user.getProducts({ where: { id: req.params.id}})

    if(!checkUser)
      return next(new AppError('You do not have permission to edit this product', 401));

    product  = await Product.destroy({where: {id: req.params.id}})

    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json("Product successfully deleted!")
     
  })


  exports.getAdminProducts = catchAsync (async (req, res, next)  => {
    const products =  await req.user.getProducts({
      attributes: { 
        include: [[Sequelize.fn("AVG", Sequelize.col("rating")), "ratingAvg"],
        [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewCount"]
    ] ,
      
        group: ['reviews.id']
    },
    include: [
    { model:User },    
    {
        model: Review, attributes: [],
    }],
    group: ['product.id','user.id']

    })


    if(!products)
        return next(new AppError('No product found', 404));

    return res.status(200).json(products)
     
  })


  exports.getEditProduct = catchAsync (async (req, res, next)  => {
   
    // product  = await Product.findOne({where: {id: req.params.id}})
    //userId in product table must belong to user
    const product =  await req.user.getProducts({where: {id: req.params.id}})


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product[0])
     
  })




  //not using req.user because have to get -> edit
  exports.postEditProduct = catchAsync (async (req, res, next)  => {
    console.log(req.params.id)
    let checkUser =  req.user.getProducts({ where: { id: req.params.id}})

    if(!checkUser)
      return next(new AppError('You do not have permission to edit this product', 401));

    if(req.file)
      req.body.imageUrl= req.file.filename

    let updateValues = { 
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description

    };

    product = await Product.update(updateValues, { where: { id: req.params.id}})

  //   console.log(req.body)
  //  const [count, product] = await Product.update(updateValues, { where: { id: req.params.id}, returning:'true'})


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product) //updated value only
     
  })