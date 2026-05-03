const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// تحميل المتغيرات من ملف .env
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// راوت تجريبي للتاكد ان السيرفر شغال
app.get("/", (req, res) => {
  res.send("API Running...");
});

// راوتات المنتجات
app.use("/api/products", require("./routes/productRoutes"));

// راوتات المستخدمين
app.use("/api/auth", require("./routes/authRoute"));

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});