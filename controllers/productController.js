const Product = require("../models/Product");
const Brands = require("../models/Brand");
const createProduct = async (req, res) => {
  try {
    const {
      // image,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    } = req.body;
    console.log(req.body);
    if (
      // !image ||
      !title ||
      !desc ||
      !price ||
      !discount ||
      !color ||
      !category ||
      !size ||
      !gender ||
      !qty ||
      !brand
    ) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }
    console.log("test");
    const duplicate = await Product.findOne({ title });
    if (duplicate) {
      return res.status(400).json({ message: "PRODUCT ALREADY EXIST" });
    }
    const brandObj = await Brands.findOne({ _id: brand });
    if (!brandObj) {
      return res.status(400).json({ message: "BRAND NOT FOUND" });
    }
    const productObj = {
      image: req.file.filename,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    };

    const product = new Product(productObj);
    await product.save();
    if (product) {
      brandObj.products.push(product._id);
      brandObj.save();
      return res.status(200).json({ message: "PRODUCT ADDED" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    if (!data?.length) {
      return res.status(400).json({ message: "NO PRODUCT FOUND" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT NOT FOUND" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      // id,
      // image,
      title,
      desc,
      price,
      discount,
      color,
      category,
      size,
      gender,
      qty,
      brand,
    } = req.body;
    console.log("test");
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(400).json({ message: "PRODUCT NOT FOUND" });
    }
    const duplicate = await Product.findOne({ title });
    if (duplicate && duplicate?._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "PRODUCT WITH THE SAME NAME ALREADY EXISTS" });
    }
    // if (duplicate) {
    //   return res
    //     .status(400)
    //     .json({ message: "PRODUCT WITH THE SAME NAME ALREADY EXISTS" });
    // }
    // product.image = req.file.filename;
    if (req?.file) {
      product.image = req.file.filename;
    }
    product.title = title;
    product.desc = desc;
    product.price = price;
    product.discount = discount;
    product.color = color;
    product.category = category;
    product.size = size;
    product.gender = gender;
    product.qty = qty;
    product.brand = brand;

    await product.save();
    res.status(200).json({ message: "PRODUCT UPDATED" });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("test");
    const del = await Product.findOneAndDelete({ _id: id });
    console.log("test");

    res.status(200).json({ message: "PRODUCT DELETED SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
