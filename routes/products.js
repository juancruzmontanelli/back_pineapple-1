const express = require("express");

const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/productController");
const { validateAdmin, validateAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/:name", getOne);
router.delete("/delete/:name", validateAuth, validateAdmin, deleteOne);
router.put("/update/:name", validateAuth, validateAdmin, updateOne);
router.get("/", getAll);
router.post("/add", validateAuth, validateAdmin, create);

module.exports = router;
