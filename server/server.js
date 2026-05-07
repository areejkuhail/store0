const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();


connectDB();

const app = express();

app.use(cors({
  origin: 'https://store0-seven.vercel.app'
}));
app.use(express.json());                                                                                                                                         

app.get("/", (req, res) => {
  res.send("API Running...");
});


app.use("/api/products", require("./routes/productRoutes"));


app.use("/api/auth", require("./routes/authRoute"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});