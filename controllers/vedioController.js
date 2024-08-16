const uploadSingleFile = require('../config/aws-setup.js');
const createError = require('http-errors');

const funkyPicToCloudSingle = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(createError.BadRequest('No files uploaded'));
    }

    // Map through files and upload each
    const folder = req.files[0].fieldname === 'vedio' ? 'vedio' : 'image'; // Assumes all files are of the same type

    const uploadPromises = req.files.map(file =>
      uploadSingleFile(file, folder).catch(error => {
        console.error("Upload error:", error);
        throw createError.InternalServerError('Failed to upload the file: ' + error.message);
      })
    );

    const fileUrls = await Promise.all(uploadPromises);

    return res.status(200).send({ message: "Files uploaded successfully!", data: { urls: fileUrls } });
  } catch (err) {
    console.error("Controller error:", err);
    next(err);
  }
};

const funkyPicToCloud = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError.BadRequest('No file uploaded'));
    }

    const folder = req.file.fieldname === 'vedio' ? 'vedio' : 'image';
 
    const imgUrl = await uploadSingleFile(req.file, folder).catch(error => {
      console.error("Upload error:", error);
      throw createError.InternalServerError('Failed to upload the file: ' + error.message);
    });

    return res.status(200).send({ message: "File uploaded successfully!", data: { url: imgUrl } });
  } catch (err) {
    console.error("Controller error:", err);
    next(err);
  }
};

module.exports = {funkyPicToCloudSingle, funkyPicToCloud};