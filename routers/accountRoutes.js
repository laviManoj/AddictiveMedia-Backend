const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/updateAccount', authMiddleware, accountController.updateAccount);
router.get('/accountDetails', authMiddleware, accountController.getUserDetails);


// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

module.exports = router;