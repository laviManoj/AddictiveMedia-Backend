const express = require('express');
const {funkyPicToCloudSingle, funkyPicToCloud} = require('../controllers/vedioController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require("multer");
const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Video upload route - for multiple files
router.post('/vedioUpload', authMiddleware, upload.array("videos"), funkyPicToCloudSingle);

// Profile image upload route
router.post('/profileImage', authMiddleware, upload.single("image"), funkyPicToCloud);

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

module.exports = router;
