const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4(), index: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  age: { type: Number, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
