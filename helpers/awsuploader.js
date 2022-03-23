const fs = require('fs');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


exports.uploadFile = (filePath,fileName,type) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);
    var fileStream = fs.createReadStream(filePath)

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'experteducation',
        Key: `${fileName}.${type}`, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    return new Promise(function(resolve, reject) {
        fileStream.once('error', reject);
        s3.upload(params).promise().then(resolve, reject);
    });
};