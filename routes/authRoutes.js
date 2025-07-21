const express = require("express");
const {
  register,
  login,
  logout,
  refresh,
  getAllUsers,
  getSingleUser,
} = require("../controllers/authController");

const router = require("express").Router();
router.route("/").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh").post(refresh);
router.route("/getallUsers").get(getAllUsers);
router.route("/single/:id").get(getSingleUser);

module.exports = router;
