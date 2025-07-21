const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = require("express").Router();
router.route("/").post(createOrder);
router.route("/allorders").get(getAllOrders);
router.route("/singleorder").get(getSingleOrder);
router.route("/:id").patch(updateOrder);

module.exports = router;
