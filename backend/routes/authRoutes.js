const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

// Send OTP for Login / Registration
router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name: email.split('@')[0], otp: { code: otpCode, expiresAt } });
    } else {
      user.otp = { code: otpCode, expiresAt };
    }
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Your Login / Verification OTP Code',
      message: `Your OTP for Mentor-Mentee Tracking System is: ${otpCode}. It is valid for 10 minutes.`,
      html: `<h2>Mentor-Mentee Tracker Verification</h2><p>Your OTP code is: <strong style="font-size:24px; color:#10b981;">${otpCode}</strong></p><p>Valid for 10 minutes.</p>`
    });

    res.json({ success: true, message: 'OTP sent successfully to ' + email, demoOtp: otpCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify OTP & Login
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, role, name, title, skills } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.otp || user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isVerified = true;
    if (role) user.role = role;
    if (name) user.name = name;
    if (title) user.title = title;
    if (skills) user.skills = skills;
    user.otp = undefined; // Clear OTP
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        skills: user.skills
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
