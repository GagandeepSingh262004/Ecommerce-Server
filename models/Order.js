const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    paymentId: {
      //doubt
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
