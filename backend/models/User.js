const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['mentor', 'mentee', 'admin'], default: 'mentee' },
  title: { type: String, default: '' },
  skills: [{ type: String }],
  capacity: { type: Number, default: 3 },
  otp: {
    code: { type: String },
    expiresAt: { type: Date }
  },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
