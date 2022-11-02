const express = require("express");

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/productController");

const router = express.Router();

router.get("/:id", getOne);
router.delete("/delete/:id", deleteOne);
router.put("/update/:id", updateOne);
router.get("/", getAll);
router.post("/add", createOne);

module.exports = router;
