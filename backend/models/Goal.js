const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  category: { type: String, required: true },
  targetDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Achieved'], default: 'Not Started' },
  progressPercent: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
