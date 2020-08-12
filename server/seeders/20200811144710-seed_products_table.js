'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('products', [
        {
          title: "DRESS A",
          price: 20,
          imageUrl: "product-images/DRESSA.PNG",
          description: "Dress A",
          subsubcategoryId: 1,
          userId: 1
  
      },
      {
        title: "DRESS B",
        price: 20,
        imageUrl: "product-images/DRESSB.PNG",
        description: "Dress B",
        subsubcategoryId: 1,
        userId: 1

    },
    {
          title: "SKIRT A",
          price: 20,
          imageUrl: "product-images/SKIRTA.PNG",
          description: "Skirt A",
          subsubcategoryId: 2,
          userId: 1
  
      },
      {
        title: "SKIRT B",
        price: 19.50,
        imageUrl: "product-images/SKIRTB.PNG",
        description: "Skirt A",
        subsubcategoryId: 2,
        userId: 1

    },
    {
      title: "BLOUSE A",
      price: 15.50,
      imageUrl: "product-images/BLOUSEA.PNG",
      description: "Blouse A",
      subsubcategoryId: 3,
      userId: 1

  },
  {
    title: "BLOUSE B",
    price: 15.00,
    imageUrl: "product-images/BLOUSEB.PNG",
    description: "Blouse B",
    subsubcategoryId: 3,
    userId: 1

},
{
  title: "SNEAKER A",
  price: 18.00,
  imageUrl: "product-images/FSNEAKERA.PNG",
  description: "Sneaker A",
  subsubcategoryId: 4,
  userId: 1

},
{
  title: "SNEAKER B",
  price: 25.00,
  imageUrl: "product-images/FSNEAKERB.PNG",
  description: "Sneaker B",
  subsubcategoryId: 4,
  userId: 1

},
{
  title: "HEEL A",
  price: 23.40,
  imageUrl: "product-images/HEELA.PNG",
  description: "Heel A",
  subsubcategoryId: 5,
  userId: 1

},
{
  title: "HEEL B",
  price: 24.40,
  imageUrl: "product-images/HEELB.PNG",
  description: "Heel B",
  subsubcategoryId: 5,
  userId: 1

},
{
  title: "TSHIRT A",
  price: 18.40,
  imageUrl: "product-images/TSHIRTA.PNG",
  description: "Tshirt A",
  subsubcategoryId: 6,
  userId: 1

},
{
  title: "TSHIRT B",
  price: 24.40,
  imageUrl: "product-images/TSHIRTB.PNG",
  description: "Tshirt B",
  subsubcategoryId: 6,
  userId: 1

},
{
  title: "SNEAKER A",
  price: 18.00,
  imageUrl: "product-images/MSNEAKERA.PNG",
  description: "Sneaker A",
  subsubcategoryId:7,
  userId: 1

},
{
  title: "SNEAKER B",
  price: 17.50,
  imageUrl: "product-images/MSNEAKERB.PNG",
  description: "Sneaker B",
  subsubcategoryId:7,
  userId: 1

},
{
  title: "FORMAL A",
  price: 25.50,
  imageUrl: "product-images/FORMALA.PNG",
  description: "Formal A",
  subsubcategoryId: 8,
  userId: 1

},
{
  title: "FORMAL B",
  price: 28.50,
  imageUrl: "product-images/FORMALB.PNG",
  description: "Formal A",
  subsubcategoryId: 8,
  userId: 1

}

])
},
  

    down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('products', null, {});
       
    }}
