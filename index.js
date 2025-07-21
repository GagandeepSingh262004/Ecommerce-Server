const dotenv = require("dotenv");
dotenv.config("./.env");
const connection = require("./config/connection");
const express = require("express");
const path = require("path");
const { register } = require("./controllers/authController");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bodyParser = require("body-parser");
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads/products")));

app.use(express.static(path.join(__dirname, "uploads/brands")));

app.use("/auth", require("./routes/authRoutes"));

app.use("/brand", require("./routes/brandRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/review", require("./routes/reviewRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.listen(process.env.PORT, () => {
  console.log(`Port is running at ${process.env.PORT}`);
});
