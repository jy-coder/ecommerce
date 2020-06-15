const Product = require('../models/product')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')




exports.addProduct = catchAsync (async (req, res, next)  => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

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
    product  = await Product.destroy({where: {id: req.body.productId}})

    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json("deleted!")
     
  })


  exports.getAdminProducts = catchAsync (async (req, res, next)  => {
    const products =  await req.user.getProducts({})


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
    let updateValues = { 
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description

    };

    // const [count, product] =  req.user.getProducts({})


   const [count, product] = await Product.update(updateValues, { where: { id: req.params.id}, returning:'true'})


    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product) //updated value only
     
  })