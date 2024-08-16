const express = require('express');
const funkyPicToCloudSingle = require('../controllers/vedioController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require("multer");
const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Video upload route
router.post('/vedioUpload', authMiddleware, upload.single("vedio"), funkyPicToCloudSingle);

// Profile image upload route
router.post('/profileImage', authMiddleware, upload.single("image"), funkyPicToCloudSingle);

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

module.exports = router;