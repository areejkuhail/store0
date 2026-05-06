const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// تسجيل حساب جديد
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'الإيميل مسجل مسبقاً' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id, user.isAdmin),
  });
};

// تسجيل الدخول
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'الإيميل أو الباسورد غلط' });

  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ message: 'الإيميل أو الباسورد غلط' });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id, user.isAdmin),
  });
};


const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

module.exports = { registerUser, loginUser, getProfile };