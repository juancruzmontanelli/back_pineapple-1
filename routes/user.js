const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const {
  userRegister,
  userLogin,
  userLogout,
  userData,
} = require("../controllers/usercontroller");
const { validateAuth } = require("../middlewares/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/me", validateAuth, userData);

module.exports = router;
