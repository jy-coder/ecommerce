const express = require('express');
const path = require('path');
const adminController = require(path.join(__dirname,'../controllers/adminController'))
const authController = require(path.join(__dirname,'../controllers/authController'))
const upload = require(path.join(__dirname,'../services/file-upload'))
const router = express.Router()
const deleteFile = require(path.join(__dirname,'../services/file-delete'))

// router.use(authController.protect);






//below route should be protected
router.use(authController.protect)
router.post('/addproducts', adminController.uploadAWSPhoto,adminController.uploadToAWS,adminController.uploadToAWS,adminController.addProduct );
router.delete('/deleteproduct/:id',deleteFile.deleteAWSFile, adminController.deleteProduct );
router.get('/edit/:id', adminController.getEditProduct );
router.get('/edit', adminController.getAdminProducts);
router.patch('/edit/:id', adminController.uploadAWSPhoto,adminController.uploadToAWS, adminController.postEditProduct);


module.exports = router;