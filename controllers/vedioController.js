const uploadSingleFile = require('../config/aws-setup.js')
const createError = require('http-errors')


 const funkyPicToCloudSingle = async (req, res, next) => {
  try {
    const imgUrl = await uploadSingleFile(req.file || "image", "vedio").catch(error => {
      next(createError.InternalServerError({ message: "Failed to upload the file." }));
      return;
    });
    return res.status(200).send({ message: "File uploaded successfully!", data: { url: imgUrl } });
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError({ message: "Failed to upload the file." }));
    return;
  }
};

module.exports =funkyPicToCloudSingle;


