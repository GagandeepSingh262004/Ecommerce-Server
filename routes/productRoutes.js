const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 13 * 1024 * 1024,
  },
});
router.route("/uploads").post(upload.single("file"), createProduct);
router.route("/").post(createProduct);
router.route("/allproducts").get(getAllProducts);
router.route("/singleproduct/:id").get(getSingleProduct);
router.route("/:id").patch(upload.single("file"), updateProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;
