const express = require("express");
const {
  createBrand,
  updateBrand,
  getAllBrands,
  getSingleBrand,
  deleteBrand,
} = require("../controllers/brandController");

const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/brands");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.route("/brandUploads").post(upload.single("file"), createBrand);
router.route("/").post(createBrand);
router
  .route("/single/:id")
  .patch(upload.single("file"), updateBrand)
  .get(getSingleBrand);
router.route("/allbrands").get(getAllBrands);
// router.route("/:id").get(getSingleBrand);
router.route("/:id").delete(deleteBrand);

module.exports = router;
