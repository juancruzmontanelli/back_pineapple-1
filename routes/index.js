const express = require("express");
const products = require('./products')
const cart = require("./cart");
const user = require("./user");
const  router = express.Router()

router.use('/products', products)
router.use("/cart", cart);
router.use("/user", user);


module.exports = router;

