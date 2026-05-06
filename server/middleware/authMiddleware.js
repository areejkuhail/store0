const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'غير مصرح، سجل دخول أولاً' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'التوكن غير صالح' });
  }
};


const admin = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403).json({ message: 'غير مصرح، أدمن فقط' });
};

module.exports = { protect, admin };