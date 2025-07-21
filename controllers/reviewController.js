const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { productId, rating, reviewdesc, userId } = req.body;
    if (!productId || !rating || !reviewdesc || !userId) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }
    const duplicate = await Review.findOne({ userId });
    if (duplicate) {
      return res.status(400).json({ message: "User already added review " });
    }

    const reviewObj = {
      productId,
      rating,
      review,
      userId,
    };
    const review = new Review(reviewObj);
    await review.save();
    if (review) {
      res.status(200).json({ message: "REVIEW ADDED" });
    }
  } catch (error) {
    res.status.json({ message: "SERVER ERROR" });
  }
};
const getAllReview = async (req, res) => {
  try {
    const data = await Review.find({});
    if (!data.length) {
      return res.status(400).json({ message: "NO REVIEW FOUND" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};
//Single getsingleReview-left
const getSingleReview = async (req, res) => {
  try {
    const { id } = req.id;
    const review = await Review.findOne({ _id: id });
    if (!review) {
      return res.status(400).json({ message: "REVIEW NOT FOUND" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};
const updateReview = async (req, res) => {
  try {
    const { id, productId, rating, reviewdesc, userId } = req.body;
    const review = await Review.findOne({ _id: id });
    if (!review) {
      return res.status(400).json({ message: "NO REVIEW FOUND" });
    }
    const duplicate = await Review.findOne({ productId });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "PRODUCT WITH THE SAME NAME ALREADY EXISTS" });
    }

    review.productId = productId;
    review.rating = rating;
    review.reviewdesc = reviewdesc;
    review.userId = userId;
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Review.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "REVIEW DELETED SUCCESSFULLY" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getSingleReview,
  getAllReview,
};
