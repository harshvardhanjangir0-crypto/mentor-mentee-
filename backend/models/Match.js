const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  compatibilityScore: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
  matchedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
