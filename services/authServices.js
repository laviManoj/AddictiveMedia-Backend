const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signup = async (firstName, lastName, phoneNumber,  email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = new User({ firstName, lastName, phoneNumber, email, password });
  await user.save();
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
       
        return {  message: 'Account Created successfully', user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email }, token };
};

const signin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1d' });
  return { user: { id: user._id, username: user.username, email: user.email }, token };
};

module.exports = {
  signup,
  signin,
};