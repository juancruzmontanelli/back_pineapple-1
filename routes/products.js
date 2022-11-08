const express = require("express");

const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/productController");
const { productRegister } = require("../middlewares/auth");

const router = express.Router();

router.get("/:name", getOne);
router.delete("/delete/:name", deleteOne);
router.put("/update/:name", updateOne);
router.get("/", getAll);
router.post("/add", productRegister, create);

module.exports = router;
