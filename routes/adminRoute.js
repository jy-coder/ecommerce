const express = require('express');
const adminController = require('../controllers/adminController')
const authController = require('../controllers/authController')
const router = express.Router()
const deleteFile = require('../services/file-delete')




//below route should be protected
router.use(authController.protect)
router.post('/addproducts', adminController.addProduct);
router.delete('/deleteproduct/:id', adminController.deleteProduct );
router.get('/edit/:id', adminController.getEditProduct );
router.get('/edit', adminController.getAdminProducts);
router.patch('/edit/:id', adminController.postEditProduct);


module.exports = router;