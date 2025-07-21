const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const cart = req.body;
  console.log(cart);
  const instance = new Razorpay({
    key_id: "rzp_test_3WbPzeexWFf3Wx",
    key_secret: "rmqFwXefGDhqePUbLLjIBRtL",
  });

  const amount = cart.reduce((acc, item) => {
    const price = item.product.discount
      ? item.product.price - item.product.discount
      : item.product.price;
    return acc + price * item.qty;
  }, 0);
  console.log(amount);
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  const order = await instance.orders.create(options);
  if (!order) {
    return res.status(400).json({ message: "ORDER COULD NOT BE CREATED" });
  }
  res.json(order);
});
module.exports = router;
