const Brand = require("../models/Brand");

const createBrand = async (req, res) => {
  try {
    // const { title, desc, products } = req.body;
    const { title, desc } = req.body;
    // !products
    if (!title || !desc) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED " });
    }
    const duplicate = await Brand.findOne({ title });
    if (duplicate) {
      return res.status(400).json({ message: "BRAND ALREADY EXISTS" });
    }
    const brandObj = {
      title,
      image: req.file.filename,
      desc,
      // products,
    };
    const brand = new Brand(brandObj);
    await brand.save();
    if (brand) {
      return res.status(200).json({ message: "BRAND ADDED" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getAllBrands = async (req, res) => {
  try {
    // console.log("test");
    const data = await Brand.find({});
    // console.log(data);
    if (!data?.length) {
      return res.status(400).json({ message: "NO BRAND FOUND" });
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getSingleBrand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const brand = await Brand.findOne({ _id: id });
    console.log(brand);
    if (!brand) {
      return res.status(400).json({ message: "BRAND NOT FOUND" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.params;
    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      return res.status(400).json({ message: "BRAND NOT FOUND" });
    }
    const duplicate = await Brand.findOne({ title });

    if (duplicate && duplicate?._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "PRODUCT WITH THE SAME NAME ALREADY EXISTS" });
    }
    // if (duplicate) {
    //   return res
    //     .status(400)
    //     .json({ message: "BRAND WITH THE SAME NAME ALREADY EXIST" });
    // }
    if (req?.file) {
      brand.image = req.file.filename;
    }
    brand.title = title;
    brand.desc = desc;

    await brand.save();
    res.status(200).json({ message: "BRAND UPDATED" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Brand.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "BRAND DELETED SUCCESSFULLY" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

module.exports = {
  createBrand,
  updateBrand,
  getAllBrands,
  getSingleBrand,
  deleteBrand,
};
