const express = require('express');
const paymentController = require('../controllers/paymentController')
const authController = require('../controllers/authController')
const router = express.Router();

router.use(authController.protect)
router.post('/charge', paymentController.makePayment)


module.exports = router;