const Product = require('../models/product')
const Review= require('../models/review')
const Order= require('../models/order')
const User= require('../models/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Category = require('../models/category')
const Subcategory = require('../models/subcategory')
const Subsubcategory = require('../models/subsubcategory')
const OrderItem = require('../models/order-item')




exports.getProducts = catchAsync (async (req, res, next) => {
    const sortBy = req.query.sortBy || 'reviewCount'
    const orderBy = req.query.orderBy || 'asc'
    const limit = req.query.limit* 1 || 6; 


    let orderSort =[[sortBy, orderBy]];
    let whereQuery ={title: {[Op.ne]: null}}

    if (sortBy === 'reviewCount')
        orderSort = [[Sequelize.col("reviewCount"),'desc']]
    if (req.query.search)
        whereQuery = {title: {[Op.iLike]:`%${req.query.search}%`}}
    else if(req.query.category){
        str = req.query.category
        subsubId = parseInt(str.charAt(0))
        categoryName = str.slice(1,str.length)
        whereQuery = {subsubcategoryId: subsubId}
        

    }
    

    products = await Product.findAll({
    where: whereQuery,
    include: [
        { model:User },   
        {model: Review, attributes: []}
    ],
    attributes: { 
                    include: [
                                [Sequelize.fn("AVG", Sequelize.col("rating")), "ratingAvg"],
                                [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewCount"]
                            ] ,group: ['reviews.id']
                },
    group: ['product.id','user.id'],
    order: orderSort,
    limit: limit,
    subQuery:false
    })


    const pagesQuery = await Product.findAndCountAll({
        where:whereQuery
      })
  
    const totalCount =pagesQuery.count

    if(!products)
        return next(new AppError('No products', 404));

    return res.status(200).json({products,totalCount})

})




exports.getProduct = catchAsync (async (req, res, next)  => {
    product  = await Product.findOne({
        where: {id: req.params.id},
        attributes: { 
            include: [[Sequelize.fn("AVG", Sequelize.col("rating")), "ratingAvg"],
            [Sequelize.fn("COUNT", Sequelize.col("reviews.id")), "reviewCount"]], 
            
        },
        include: [{
            model: Review,
            include:[{
                model:User,
                attributes:['name']
            }]
        }],
            group: ['product.id','reviews.id','reviews.user.id'],
            order:[[Review,'updatedAt','desc']]
          
        
       
        })
    

    if(!product)
        return next(new AppError('No product found', 404));

    return res.status(200).json(product)
     
  })




exports.getCart =catchAsync( async (req, res, next) => {
    const cart = await req.user.getCart()

    if(!cart)
        return next(new AppError('No cart found', 404));

    products = await cart.getProducts()
 
    res.status(200).json(products)
})


//add one item to cart// pass in prodId
exports.addToCart =catchAsync( async (req, res, next) => {
    let product
    const cart = await req.user.getCart()

    if(!cart)
        return next(new AppError('No cart found', 404));
   
    const newProduct = await Product.findByPk(req.body.prodId);
    
    products = await cart.getProducts({where: {id:req.body.prodId}})
   
    if(products.length > 0)
         product = products[0] //one product only
        
    
    
     //existing in cart
    if(product){
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
       
    }
    else{
        newQuantity = 1
    }

    await cart.addProduct(newProduct,{
        through:{quantity:newQuantity},
        returning:true
    
    })
    
    res.status(200).json('Sucessfully added to cart')
})


//remove single existing product fomr cart
exports.deleteFromCart =catchAsync( async (req, res, next) => {

    let product
    const cart = await req.user.getCart()
   
    if(cart){
        products = await cart.getProducts({where: {id:req.params.prodId}})
    }

    if(products){
        product = products[0] //one product only
        await product.cartItem.destroy()

    }

    const newCartWithProduct = await cart.getProducts()
    res.status(200).json(newCartWithProduct)
})



exports.addOrder =catchAsync( async (req, res, next) => {

   
    const cart = await req.user.getCart()
 

    const cartItemsNotSelected = await cart.getProducts({ where: { id:  {[Op.notIn] : req.body.prodIdList} }});
    
    const itemToBeAddedToOrder = req.body.orders
    await cart.setProducts([])

   await Promise.all(itemToBeAddedToOrder.map(async(item) => {
        const newProduct = await Product.findByPk(item.productId)
        await cart.addProduct(newProduct,{
            through:{quantity: item.quantity}
           
        })
    }));


        const products = await cart.getProducts() 

        const order = await req.user.createOrder()
        await order.addProduct( 
            products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product
        }))


  
      await cart.setProducts(cartItemsNotSelected,{through:{quantity:1}})


    res.status(200).json('Order Successfully added')
})




exports.getOrders = catchAsync( async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit =  6;
    const offset = (page - 1) * limit

    const orders = await req.user.getOrders({
        include: ['products'],
        order: [[Sequelize.col("createdAt"),'desc']],
        limit,
        offset,
        subQuery: false
    })


    const pagesQuery = await Order.findAndCountAll({
        where:{userId: req.user.id}
      })

      const totalPage = Math.round(pagesQuery.count / limit)
      
    res.status(200).json({orders, totalPage})
  });


//can disable seller from reviewing their own product
exports.enableReview= catchAsync( async (req, res, next) => { 
    if(!req.user)
        return res.status(200).json()

    const productExist = await Product.findOne({id: req.body.prodId})
    if(!productExist)
        return next(new AppError('No product found', 404));

    const orderItemExist = await req.user.getOrders({include: ['products'],where:{'$products.orderItem.productId$':req.body.prodId}})
    const reviewExist = await req.user.getReviews({ where: {productId: req.body.prodId, userId: req.user.id} })
    if(orderItemExist.length === 0)
        return res.status(200).json()
    else if (reviewExist.length !== 0)
        return res.status(200).json('edit') //Allow add review
    else if(reviewExist.length === 0 )
        return res.status(200).json('add') //Allow edit review
})


exports.getMyReview= catchAsync( async (req, res, next) => {
    const review = await req.user.getReviews({where:{productId: req.params.prodId}})
    if(review.length === 0)
        return next(new AppError('You have not reviewed this product yet', 404));
    
    res.status(200).json(review[0])


})

exports.editMyReview = catchAsync( async (req, res, next) => {
    const reviewToUpdate = await req.user.getReviews({where:{productId: req.params.prodId}})

    if(reviewToUpdate.length === 0)
        return next(new AppError('You have not reviewed this product yet', 401));

    let updateValues = { 
        text: req.body.text
    };

    review = await Review.update(updateValues,{where:{productId: req.params.prodId}})

    if(!review)
        return next(new AppError('No product found', 404));

    return res.status(200).json("success")
})


exports.test = catchAsync (async (req, res, next)  => {
    const orderItemExist  =  await OrderItem.find({where:req.body.prodId})
    const reviewExist = await req.user.getReviews({productId: req.body.prodId})

  if(!categories)
      return next(new AppError('No categories', 404));

  return res.status(200).json(categories)


})



exports.addReview = catchAsync( async (req, res, next) => {

const productExist = await Product.findOne({id: req.body.prodId})
if(!productExist)
    return res.status(400).json("No such product exists")

const reviewAdded = await req.user.createReview({text:req.body.text, productId:req.body.prodId, rating:req.body.rating})



res.status(200).json()
});


exports.getCategories = catchAsync (async (req, res, next)  => {

    
    categories  = await Category.findAll({
        include: [{
            model: Subcategory,
            include:[{
                model: Subsubcategory   
            }]
        }]
      })
    
    if(!categories )
        return next(new AppError('No categories  found', 404));

    return res.status(200).json(categories)
     
  })



  exports.getSubcategories = catchAsync (async (req, res, next)  => {
    subcategories  = await Subcategory.findAll({where: {categoryId:req.params.categoryId}})
    
    if(!subcategories )
        return next(new AppError('No subcategories  found', 404));

    return res.status(200).json(subcategories)
     
  })

 




