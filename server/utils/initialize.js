module.exports = async () => {
    //Require models
    const Product = require('../models/product')
    const User = require('../models/user')
    const Cart = require('../models/cart')
    const CartItem = require('../models/cart-item')
    const Order = require('../models/order')
    const OrderItem = require('../models/order-item')
    const Review = require('../models/review')
    const Category = require('../models/category')
    const Subcategory = require('../models/subcategory')
    const Subsubcategory = require('../models/subsubcategory')


    //Establish models r/s before syncing
    Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User);
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });
    Order.belongsTo(User);
    User.hasMany(Order);
    Order.belongsToMany(Product, { through: OrderItem });
    Product.hasMany(Review);
    User.hasMany(Review);
    Review.belongsTo(User);

    Category.hasMany(Subcategory)
    Subcategory.belongsTo(Category)

    Subcategory.hasMany(Subsubcategory)
    Subsubcategory.belongsTo(Subcategory)
    

    


    Product.belongsTo(Subsubcategory)
    Subsubcategory.hasMany(Product)
    


    // //Generic Error Handler 
    // const errHandler = err => {
    //     //Catch and log any error.
    //     console.error("Error: ", err);
    // };
    

    // const user = await User.create({
    //     name: 'test',email:'test@test.com',password: 'test'
    // }).catch(errHandler);

    // const cart = await user.createCart().catch(errHandler);


    // const category1 = await Category.create({name: 'Women\'s Fashion'}).catch(errHandler);
    // const category2 = await Category.create({name: 'Men\'s Fashion'}).catch(errHandler);
    // const subcategory1 = await Subcategory.create({name:'Women Clothing', categoryId:1}).catch(errHandler);
    // const subcategory2 = await Subcategory.create({name:'Women Shoes', categoryId:1}).catch(errHandler);
    // const subcategory3 = await Subcategory.create({name:'Accessories', categoryId:1}).catch(errHandler);
    // const subcategory4 = await Subcategory.create({name:'Men Clothing', categoryId:2}).catch(errHandler);
    // const subcategory5 = await Subcategory.create({name:'Men Shoes', categoryId:2}).catch(errHandler);
    // const subcategory6 = await Subcategory.create({name:'Accessories', categoryId:2}).catch(errHandler);

    // const subsubcategory1 = await Subsubcategory.create({name:'Dresses', subcategoryId:1}).catch(errHandler);
    // const subsubcategory2 = await Subsubcategory.create({name:'Sneakers', subcategoryId:2}).catch(errHandler);
    // const subsubcategory3 = await Subsubcategory.create({name:'Skirts', subcategoryId:1}).catch(errHandler);



    // const product1 = await user.createProduct({
    //     title: "test1",
    //     price: 30.20,
    //     imageUrl: "a.PNG",
    //     description: "test1",
    //     subsubcategoryId: 1

    // }).catch(errHandler);


    // const product2 = await user.createProduct({
    //     title: "test2",
    //     price: 30.20,
    //     imageUrl: "a.PNG",
    //     description: "test2",
    //     subsubcategoryId: 1

    // }).catch(errHandler);




    
}