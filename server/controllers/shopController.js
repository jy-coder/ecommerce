const path = require('path');
const Product = require(path.join(__dirname,'../models/product'))
const Review= require(path.join(__dirname,'../models/review'))
const User= require(path.join(__dirname,'../models/user'))
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const catchAsync = require(path.join(__dirname,'../utils/catchAsync'))
const AppError = require(path.join(__dirname,'../utils/AppError'))
const Category = require(path.join(__dirname,'../models/category'))
const Subcategory = require(path.join(__dirname,'../models/subcategory'))
const Subsubcategory = require(path.join(__dirname,'../models/subsubcategory'))
const OrderItem = require(path.join(__dirname,'../models/order-item'))
const db = require('../utils/database');



exports.getProducts = catchAsync (async (req, res, next) => {
    
 
    // const page = req.query.page * 1 || 1;
    const sortBy = req.query.sortBy || 'reviewCount'
    const orderBy = req.query.orderBy || 'asc'
    const limit = req.query.limit* 1 || 2; //setted by me
    // const offset = (page - 1) * limit

    let orderSort =[[sortBy, orderBy]];
    let whereQuery ={title: {[Op.ne]: null}}
    let nameQuery ={name: {[Op.ne]: null}}

    if (sortBy === 'reviewCount')
        orderSort = [[Sequelize.col("reviewCount"),'desc']]
    if (req.query.search)
        whereQuery = {title: {[Op.iLike]:`%${req.query.search}%`}}
    else if(req.query.category){
        console.log(req.query.category)
        str = req.query.category
        subsubId = parseInt(str.charAt(0))
        categoryName = str.slice(1,str.length)
        // nameQuery ={name: categoryName}
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

    if(!cart)
        return next(new AppError('No cart found', 404));

    products = await cart.getProducts()
    // console.log(products)
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

   
// const review = await Review.findOne({where: {id:reviewAdded.id}, include:[{model:User, attributes:['name']}]})

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

 


  exports.makePayment = catchAsync(async (req, res, next) => {
    let transaction
    let order
    try{
        transaction =  await db.transaction({ autocommit: false });
        order = await req.user.createOrder({},{transaction})
        
        await transaction.commit();

        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
        const { id, amount } = req.body
        let finalamount = amount * 100
        const payment = await stripe.paymentIntents.create({
            amount : finalamount ,
            currency: "SGD",
            description: `Order ${order.id}` ,
            payment_method: id,
            confirm: true
        });
    }catch(err){
        console.log(err)
        await transaction.rollback();
        res.status(404).json('Something went wrong')
    }

        

        const cart = await req.user.getCart()
        const cartItemsNotSelected = await cart.getProducts({ where: { id:  {[Op.notIn] : req.body.prodIdList} }});
        const itemToBeAddedToOrder = req.body.orders

        //empty the cart such that cart only contains the selected products
        await cart.setProducts([])
    
        //add selected products
      const addedSelected = await Promise.all(itemToBeAddedToOrder.map(async(item) => {
        const newProduct = await Product.findByPk(item.productId)
        await cart.addProduct(newProduct,{
            through:{quantity: item.quantity}     
        })
    }));
    
    //get cart which now only contain selected items
    const products = await cart.getProducts() 
    //              ___________________        
    //              |    Products     |
    //transfer cart items -> order items 
    const addedToOrder = await order.addProduct(products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product
    }))
    //set cart to unselected items
    const newCart = await cart.setProducts(cartItemsNotSelected,{through:{quantity:1}})

    return res.status(200).json({orderId: `${order.id}`})
    

   

  });

