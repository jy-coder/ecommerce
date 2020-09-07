const s3 = require('../utils/aws-handler')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')



  
  exports.deleteAWSFile =   catchAsync (async (req, res,next) =>{
    
    const imageToBeDeleted = {
      Bucket: 'fw-img-bucket', 
      Delete: { // required
        Objects: [ // required
          {
            Key: req.body.oldImage // required
          }
        ]
      },
    };
  
    const deletedItem = await s3.deleteObjects(imageToBeDeleted).promise()
    // res.status(200).json()
    next()
  })
