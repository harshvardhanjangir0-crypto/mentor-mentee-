const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('mentorId menteeId', 'name email title skills');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new match
router.post('/create', async (req, res) => {
  try {
    const { mentorId, menteeId, compatibilityScore } = req.body;
    const match = new Match({ mentorId, menteeId, compatibilityScore: compatibilityScore || 90 });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
