const Order = require("../models/Order");
const { findOne } = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const { userId, productId, qty, color, price, paymentId } = req.body;
    if (!userId || !productId || !qty || !color || !price || !paymentId) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    const orderObj = {
      userId,
      productId,
      qty,
      color,
      price,
      paymentId,
    };
    const order = new Order(orderObj);
    await order.save();
    if (order) {
      return res.status(200).json({ message: "ORDER CONFIRMED" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const data = await Order.find({});
    if (!data.length) {
      return res.status(400).json({ message: "NO ORDERS FOUND " });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(400).json({ message: "NO ORDER FOUND" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, userId, productId, qty, color, price, paymentId } = req.body;
    const singleOrder = await findOne({ _id: id });
    if (!singleOrder) {
      return res
        .status(400)
        .json({ message: "THE SPECIFIC ORDER YOU WANT TO UPDATE NOT FOUND" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

// const deleteOrder = async () => {
//   try {
//     const { id } = req.params;
//     const del = await Order.findOneAndDelete({ _id: id });
//     res.status(200).json({ message: "ORDER DELETED SUCCESSFULLY" });
//   } catch (error) {
//     res.status(500).json({ message: "SERVER ERROR" });
//   }
// };

module.exports = {
  createOrder,
  // deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
