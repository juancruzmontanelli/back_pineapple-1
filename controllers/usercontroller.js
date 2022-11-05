const { validationResult } = require("express-validator");
const {
  userRegisterQuery,
  userLoginQuery,
  userUpdateQuery,
  userAllQuery,
  deleteUserQuery,
} = require("../services/userServices");

const userRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userRegisterQuery(req, res, next);
};

const userLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userLoginQuery(req, res);
};

const userLogout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

const userData = (req, res) => {
  res.send(req.user);
};

const userUpdate = (req, res, next) => {
  userUpdateQuery(req, res, next);
};

const allUsers = (req, res, next) => {
  userAllQuery(req, res, next);
};

const deleteUser = (req, res, next) => {
  deleteUserQuery(req, res, next);
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userData,
  userUpdate,
  allUsers,
  deleteUser,
};
