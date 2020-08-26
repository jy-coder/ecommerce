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





exports.addProduct = catchAsync (async (req, res, next)  => {

  console.log(req.body)

    const {title,price,description,subsubcategoryId} = req.body;


    const product =await req.user.createProduct({
        title: title,
        price: price,
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
    // console.log(req.user.id)
    const page = req.query.page * 1 || 1;
    const limit =  6;
    const offset = (page - 1) * limit

  
    const products =  await req.user.getProducts({
      attributes: { 
            include: [[Sequelize.fn("AVG", Sequelize.col("rating")), "ratingAvg"],
                      [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewCount"]
                    ] ,group: ['reviews.id']
                  },
    include: [
    { model:User },    
    {
        model: Review, attributes: [],
    }],
    group: ['product.id','user.id'],
    order: [[Sequelize.col("createdAt"),'asc']],
    limit: limit,
    offset: offset,
    subQuery:false

    })

    const pagesQuery = await Product.findAndCountAll({
      where:{userId: req.user.id}
    })

    const totalPage = Math.round(pagesQuery.count / limit)
    // console.log(totalPage)

    if(!products)
        return next(new AppError('No product found', 404));

    return res.status(200).json({products,totalPage})
     
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
    // console.log(req.body.newProduct)
    // console.log(req.params.id)
    let checkUser =  req.user.getProducts({ where: { id: req.params.id}})

    if(!checkUser)
      return next(new AppError('You do not have permission to edit this product', 401));


  

    product = await Product.update(req.body.newProduct, { where: { id: req.params.id}})

  //   console.log(req.body)
  //  const [count, product] = await Product.update(updateValues, { where: { id: req.params.id}, returning:'true'})


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product) //updated value only
     
  })


 
