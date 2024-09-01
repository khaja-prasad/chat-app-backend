const express = require("express");
const {
  login,
  signUp,
  newPassword,
  forgotpasswordUser,
  getUsers,
} = require("../controllers/AuthControllers");

const routes = express.Router();

//Login route
routes.post("/login", login);
//SignUp route
routes.post("/signup", signUp);
//Forgot Password route
routes.post("/forgotpassword", forgotpasswordUser);
//Password Update route
routes.post("/newpassword", newPassword);
//Get users
routes.get("/users", getUsers);

module.exports = routes;
