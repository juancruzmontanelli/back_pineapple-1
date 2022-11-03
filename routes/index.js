const express = require("express");
const products = require("./products");
const cart = require("./cart");
const user = require("./user");
const brand = require('./brand')
const comment = require("./comment");
const search = require("./search");
const  router = express.Router();

router.use("/products", products);
router.use("/cart", cart);
router.use("/user", user);
router.use('/brand', brand)
router.use("/comment", comment);
router.use("/search", search);

module.exports = router;
