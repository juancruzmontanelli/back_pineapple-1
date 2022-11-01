const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const {
  userRegister,
  userLogin,
  userLogout,
  userData,
  userUpdate,
} = require("../controllers/usercontroller");
const { validateAuth } = require("../middlewares/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/me", validateAuth, userData);
router.post("/:id/update", userUpdate);

module.exports = router;
