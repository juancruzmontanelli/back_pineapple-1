const express = require("express");
const router = express.Router();
const cart = require("./cart");
const user = require("./user");

router.use("/cart", cart);
router.use("/user", user);


module.exports = router;
