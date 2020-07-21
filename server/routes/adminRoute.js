const express = require('express');
const adminController = require('../controllers/adminController')
const authController = require('../controllers/authController')
const upload = require('../services/file-upload')
const router = express.Router()
const deleteFile = require('../services/file-delete')

// router.use(authController.protect);






//below route should be protected
router.use(authController.protect)
router.post('/addproducts', adminController.uploadAWSPhoto,adminController.uploadToAWS,adminController.uploadToAWS,adminController.addProduct );
router.delete('/deleteproduct/:id',deleteFile.deleteAWSFile, adminController.deleteProduct );
router.get('/edit/:id', adminController.getEditProduct );
router.get('/edit', adminController.getAdminProducts);
router.patch('/edit/:id', adminController.uploadAWSPhoto,adminController.uploadToAWS, adminController.postEditProduct);


module.exports = router;