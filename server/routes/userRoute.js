const express = require('express');
const path = require('path');
const authController = require(path.join(__dirname,'./../controllers/authController'))

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect)


router.route('/getUser').get(authController.getUser)



module.exports = router;