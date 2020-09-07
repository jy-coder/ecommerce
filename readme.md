# PERN eCommerce
> * eCommerce app built with PERN stack along with Redux for state management, Material UI, Stripe and Sequelize. 
>* Allow user to purchase items online, integrated with Stripe payment. Include functionalities such as adding to cart, viewing order history, search, pagination and sorting
> * Admin privileges granted - CRUD



## Heroku deployment
> https://pern-shop-ecommerce.herokuapp.com/ <br/>
> username: test <br/>
> password: test



## Local deployment configuration
> * config_example.txt in server folder contains variables for server configuration. Rename to **config.env** after configuration.
>*  env_example.txt in client folder contains variables for client configuration. Rename to **.env** after configuration.
> *  **utils/database.js** contains database configuration. Data can be initialized with sequelize seed function

## Quick start
Run the express server only
>cd server<br/>
npm install<br/>
npm run start:prod<br/>


Run the client server only
>cd client<br/>
npm install<br/>
npm run start<br/>

Server runs on http://localhost:1337 and client on http://localhost:3000
