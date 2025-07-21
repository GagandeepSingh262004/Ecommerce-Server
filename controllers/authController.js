const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { uName, fName, lName, password, email, phNo, address } = req.body;

    if (
      !uName ||
      !fName ||
      !lName ||
      !password ||
      !email ||
      !phNo ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const duplicate = await User.findOne({ uName });

    if (duplicate) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const userObj = {
      uName,
      fName,
      lName,
      password: hashPass,
      email,
      phNo,
      address,
    };
    const user = new User(userObj);

    await user.save();
    if (user) {
      return res.status(200).json({ message: "USER SUCCESSFULLY CREATED" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const login = async (req, res) => {
  try {
    const { uName, password } = req.body;
    if (!uName || !password) {
      return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }
    const user = await User.findOne({ uName });
    if (!user) {
      return res.status(400).json({ message: "INVAILD DETAILS ENTERED" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "INVAILD PASSOWRD" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        admin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const refresh = async (req, res) => {
  try {
    const { cookies } = req;
    if (!cookies) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    const refreshToken = cookies.jwt;
    if (!refreshToken) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decode) => {
        try {
          if (err) {
            return res.status(401).json({ message: "UNAUTHORIZED" });
          }
          const foundUser = await User.findOne({ _id: decode.id });
          const accessToken = jwt.sign(
            { id: foundUser._id, admin: foundUser.isAdmin },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "15m" }
          );
          res.json(accessToken);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies) {
      return res.sendStatus(204);
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie Cleared Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    if (!data?.length) {
      return res.status(400).json({ message: "No Users Found" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
  getAllUsers,
  getSingleUser,
};
