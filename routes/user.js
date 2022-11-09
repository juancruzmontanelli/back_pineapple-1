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
  deleteUserAdmin,
  updateUserAdmin,
  userPromoteAdmin,
} = require("../controllers/usercontroller");
const {
  validateAuth,
  validateRegister,
  validateLogin,
  validateUpdate,
  validateAdmin,
  valideSuperAdmin,
} = require("../middlewares/auth");

router.post("/register", validateRegister, userRegister);
router.post("/login", validateLogin, userLogin);
router.post("/logout", userLogout);

router.put("/update", validateAuth, validateUpdate, userUpdate);
router.put("/admin/update", validateAuth, validateAdmin, updateUserAdmin);
router.put("/promoteAdmin", validateAuth, valideSuperAdmin, userPromoteAdmin);

router.get("/me", validateAuth, userData);
router.get("/all", validateAuth, validateAdmin, allUsers);

router.delete("/:id/delete", validateAuth, validateAdmin, deleteUserAdmin);
router.delete("/delete", validateAuth, deleteUser);

module.exports = router;
