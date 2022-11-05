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
  allUsers,
  deleteUser,
} = require("../controllers/usercontroller");
const {
  validateAuth,
  validateRegister,
  validateLogin,
} = require("../middlewares/auth");

router.post("/register", validateRegister, userRegister);
router.post("/login", validateLogin, userLogin);
router.post("/logout", userLogout);
router.post("/:id/update", userUpdate);

router.get("/me", validateAuth, userData);
router.get("/all", allUsers);

router.delete("/:id/delete", deleteUser);

module.exports = router;
