const express = require("express");
const products = require("./products");
const cart = require("./cart");
const user = require("./user");
const router = express.Router();
const comment = require("./comment");
const search = require("./search");

router.use("/products", products);
router.use("/cart", cart);
router.use("/user", user);
router.use("/comment", comment);
router.use("/search", search);

module.exports = router;
