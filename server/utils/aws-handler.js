const aws = require('aws-sdk')


aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region:'ap-southeast-1'
})

const s3 = new aws.S3()


module.exports = s3;