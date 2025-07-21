const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
  getSingleReview,
  getAllReview,
} = require("../controllers/reviewController");
const router = require("express").Router();
router.route("/").post(createReview);
router.route("/allreview").get(getAllReview);
router.route("/singlereview").get(getSingleReview);
router.route("/:id").patch(updateReview);
router.route("/delete").delete(deleteReview);

module.exports = router;
