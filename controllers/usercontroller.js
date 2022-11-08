const { validationResult } = require("express-validator");
const {
  userRegisterQuery,
  userLoginQuery,
  userUpdateQuery,
  userAllQuery,
  deleteUserQuery,
  deleteUserQueryAdmin,
} = require("../services/userServices");
const { CartItem } = require("../models");
const { Product } = require("../models");

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

const userData = (req, res, next) => {
  let attributes = ["id", "name", "img", "price"];
  const { id, email, name, address, isAdmin } = req.user;
  CartItem.findAll({
    where: { userId: id },
    include: [{ model: Product, attributes: attributes }],
  })
    .then((items) => res.send({ id, email, name, address, isAdmin, items }))
    .catch(next);
};

const userUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userUpdateQuery(req, res, next);
};

const allUsers = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userAllQuery(req, res, next);
};

const deleteUser = (req, res, next) => {
  deleteUserQuery(req, res, next);
};

const deleteUserAdmin = (req, res, next) => {
  deleteUserQueryAdmin(req, res, next);
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userData,
  userUpdate,
  allUsers,
  deleteUser,
  deleteUserAdmin,
};
