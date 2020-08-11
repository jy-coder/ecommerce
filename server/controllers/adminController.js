const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const Product = require(path.join(__dirname,'../models/product'))
const User= require(path.join(__dirname,'../models/user'))
const Review= require(path.join(__dirname,'../models/review'))
const Category= require(path.join(__dirname,'../models/category'))
const Subcategory= require(path.join(__dirname,'../models/subcategory'))
const Subsubcategory= require(path.join(__dirname,'../models/subsubcategory'))
const Sequelize = require('sequelize')
const catchAsync = require(path.join(__dirname,'../utils/catchAsync'))
const AppError = require(path.join(__dirname,'../utils/AppError'))
const uploadAWS = require(path.join(__dirname,'../services/file-upload'))
const s3 = require(path.join(__dirname,'./../utils/aws-handler'))



exports.uploadAWSPhoto = uploadAWS.single('imageUrl')

exports.uploadToAWS = catchAsync (async (req, res, next)  => {
  // if (!req.file.key)
  //   return next(new AppError('You must upload an image file', 404));

  next()
    //.key name of file
    //.location = actual path in location
  // return res.status(200).json({'imageUrl': req.file.key});
})
  



exports.addProduct = catchAsync (async (req, res, next)  => {
    req.body.imageUrl= req.file.key

    const {title,imageUrl,price,description,subsubcategoryId} = req.body;


    const product =await req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        subsubcategoryId: subsubcategoryId
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
   
    //userId in product table must belong to user
    const product =  await req.user.getProducts({
      include: [{
        model: Subsubcategory,
        include: {
          model: Subcategory
        }
      }],
      where: {id: req.params.id}
    
    })


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product[0])
     
  })




  //not using req.user because have to get -> edit
  exports.postEditProduct = catchAsync (async (req, res, next)  => {
    // console.log(req.params.id)
    let checkUser =  req.user.getProducts({ where: { id: req.params.id}})

    if(!checkUser)
      return next(new AppError('You do not have permission to edit this product', 401));

    if(req.file)
      req.body.imageUrl= req.file.key

    let updateValues = { 
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        subsubcategoryId: req.body.subsubcategoryId

    };

    product = await Product.update(updateValues, { where: { id: req.params.id}})

  //   console.log(req.body)
  //  const [count, product] = await Product.update(updateValues, { where: { id: req.params.id}, returning:'true'})


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product) //updated value only
     
  })


 
