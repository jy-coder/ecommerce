const db = require('../utils/database');
const Product = require('../models/product')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const catchAsync = require('../utils/catchAsync')

exports.makePayment = catchAsync(async (req, res, next) => {
    let transaction
    let order
    try{
        //line 385 & 402 -> might cause error
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
        // console.log(err)
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