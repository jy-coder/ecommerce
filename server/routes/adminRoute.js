const express = require('express');
const adminController = require('../controllers/adminController')
// const authController = require('../controllers/authController')

const router = express.Router();

// router.use(authController.protect);





//below route should be protected

router.post('/addproducts', adminController.addProduct );
router.delete('/deleteproduct', adminController.deleteProduct );
router.get('/edit/:id', adminController.getEditProduct );
router.get('/edit', adminController.getAdminProducts);
router.patch('/edit/:id', adminController.postEditProduct);

module.exports = router;