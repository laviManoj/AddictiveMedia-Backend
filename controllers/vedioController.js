const uploadSingleFile = require('../config/aws-setup.js');
const createError = require('http-errors');

const funkyPicToCloudSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError.BadRequest('No file uploaded'));
    }

    const folder = req.file.fieldname === 'vedio' ? 'vedio' : 'image';
    
    const imgUrl = await uploadSingleFile(req.file, folder).catch(error => {
      throw createError.InternalServerError('Failed to upload the file.');
    });

    return res.status(200).send({ message: "File uploaded successfully!", data: { url: imgUrl } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = funkyPicToCloudSingle;