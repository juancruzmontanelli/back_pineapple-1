const express = require("express");
const router = express.Router();
const { userRegister } = require("../controllers/usercontroller");

router.post("/register", userRegister);

module.exports = router;
