const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  phoneNumber: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {type: String},
  bioData: {type: String},
  vedio: {type: String},
  vediosTitle: {type: String}
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;