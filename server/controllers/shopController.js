
const Product = require('../models/product')
const Review= require('../models/review')
const User= require('../models/user')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


exports.getProducts = catchAsync (async (req, res, next) => {
    products  = await Product.findAll({
        where: {userId: {[Op.not]: req.params.id}},
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
        
        // include: [ { all: true } ]
        // include: [ {
        //     model: Review,
        //     include: {
        //         model: User 
        //     }
        // } ]
    })
    if(!products)
        return next(new AppError('No products', 404));

    return res.status(200).json(products)

})


exports.getProduct = catchAsync (async (req, res, next)  => {
    //   console.log(req.params.id)
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

    if(cart)
        products = await cart.getProducts()
    // console.log(products)
    res.status(200).json(products)
})


//add one item to cart// pass in prodId
exports.addToCart =catchAsync( async (req, res, next) => {
    let product
    const cart = await req.user.getCart()
   
    const newProduct = await Product.findByPk(req.body.prodId);
    if(cart)
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

    // updatedCart = await req.user.getCart()
    // updatedProducts = await updatedCart.getProducts()

    
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
    // const newCart = await req.user.getCart()
    // const newCartWithProduct = await newCart.getProducts()

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
            // console.log(product.cartItem.quantity)
            product.orderItem = { quantity: product.cartItem.quantity };
            return product
        }))


  
      await cart.setProducts(cartItemsNotSelected,{through:{quantity:1}})



    //   await cart.setProducts([])
  





    res.status(200).json('Order Successfully added')
})




exports.getOrders = catchAsync( async (req, res, next) => {
    const orders = await req.user.getOrders({include: ['products']})
      
    res.status(200).json(orders)
  });


//can disable seller from reviewing their own product
exports.enableReview= catchAsync( async (req, res, next) => { 
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



exports.addReview = catchAsync( async (req, res, next) => {

const productExist = await Product.findOne({id: req.body.prodId})
if(!productExist)
    return res.status(400).json("No such product exists")


const orderItemExist = await req.user.getOrders({include: ['products'],where:{'$products.orderItem.productId$':req.body.prodId}})
const reviewExist = await req.user.getReviews({ where: {productId: req.body.prodId, userId: req.user.id} })
if(orderItemExist.length === 0)
    return next (new AppError("You must make a purchase to review", 400))

if(reviewExist.length !== 0)
    return next (new AppError("You have alr reviewed (Edit review?)", 400))



const reviewAdded = await req.user.createReview({text:req.body.text, productId:req.body.prodId, rating:req.body.rating})

   
const review = await Review.findOne({where: {id:reviewAdded.id}, include:[{model:User, attributes:['name']}]})

res.status(200).json(review)
});


