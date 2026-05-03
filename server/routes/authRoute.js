const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// تسجيل حساب جديد
router.post('/register', registerUser);

// تسجيل الدخول
router.post('/login', loginUser);

// جلب بيانات المستخدم
router.get('/profile', protect, getProfile);

module.exports = router;