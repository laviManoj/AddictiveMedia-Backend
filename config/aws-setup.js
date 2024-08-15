const aws = require("aws-sdk");
const fs = require("fs");
require('dotenv').config();


aws.config.setPromisesDependency();
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
});


const formS3Params = (file, folder) => ({
    // ACL: "public-read",
    Bucket: process.env.S3_BUCKET_NAME,
    Body: fs.createReadStream(file.path),
    Key: `${folder}/${Date.now()}-${file.originalname}`,
});


const uploadSingleFile = (file, folder) =>
    new Promise((resolve, reject) => {
        if (!file) return resolve("");

        const s3 = new aws.S3();
        const params = formS3Params(file, folder);

        s3.upload(params, (err, data) => {
            if (err) {
                console.log("Error occured while trying to upload to S3 bucket", err);
                return reject(err);
            }

            fs.unlinkSync(file.path);
            return resolve(data.Location);
        });
    });

    module.exports = uploadSingleFile;