const express = require("express");
const products = require('./products')
const cart = require("./cart");
const user = require("./user");
const  router = express.Router()
const brand = require('./brand')

router.use('/products', products)
router.use("/cart", cart);
router.use("/user", user);
router.use('/brand', brand)


module.exports = router;

