const express = require('express');
const adminController = require('../controllers/adminController')
const authController = require('../controllers/authController')

const router = express.Router();

// router.use(authController.protect);





//below route should be protected
router.use(authController.protect)
router.post('/addproducts', adminController.uploadPostPhoto, adminController.resizePostPhoto, adminController.addProduct );
router.delete('/deleteproduct/:id', adminController.deleteProduct );
router.get('/edit/:id', adminController.getEditProduct );
router.get('/edit', adminController.getAdminProducts);
router.patch('/edit/:id', adminController.uploadPostPhoto, adminController.resizePostPhoto, adminController.postEditProduct);

module.exports = router;