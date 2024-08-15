const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateAccount = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, bioData, videoTitle, profileImage, vedio } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.bioData = bioData;
      user.vediosTitle = videoTitle;
      user.profileImage = profileImage;
      user.vedio = vedio;

      await user.save();

      return res.status(200).json({
        message: 'Account updated successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          bioData: user.bioData,
          videoTitle: user.vediosTitle,
          profileImage: user.profileImage,
          vedio: user.vedio
        }
      });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in updateAccount:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!_id) {
      return res.status(400).json({ error: 'email is required' });
    }

    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        message: 'User details fetched successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          bioData: user.bioData,
          videoTitle: user.vediosTitle,
          profileImage: user.profileImage,
          vedio: user.vedio
        }
      });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  updateAccount,
  getUserDetails
};