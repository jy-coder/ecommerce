const s3 = require('./../utils/aws-handler')
const multer = require('multer')
const multerS3 = require('multer-s3')


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fw-img-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
			cb(null, `product-${req.user.id}-${Date.now()}.jpeg`)
		}
  })
})


module.exports=upload