const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },

    reviewdesc: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;
