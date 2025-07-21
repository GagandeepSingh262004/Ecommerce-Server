const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },

    //doubt -> product mei refer krna ha?
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Products",
      },
    ],
  },
  { timestamps: true }
);
const Brand = mongoose.model("Brands", brandSchema);
module.exports = Brand;
