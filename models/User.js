const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    uName: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phNo: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: String,
        required: false,
        ref: "Reviews",
      },
    ],
    orders: [
      {
        type: String,
        required: true,
        ref: "Orders",
      },
    ],
    address: [
      {
        type: String,
        required: true,
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
