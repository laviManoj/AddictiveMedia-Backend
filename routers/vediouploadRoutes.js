const express = require('express');
const  funkyPicToCloudSingle = require('../controllers/vedioController');
const multer = require("multer");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  let upload = multer({ storage: storage });



router.post('/vedioUpload', authMiddleware,  upload.single("vedio"), funkyPicToCloudSingle )
router.post('/profileImage', authMiddleware, upload.single("image"), funkyPicToCloudSingle)


router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Access granted to protected route', user: req.user });
  });

module.exports = router;