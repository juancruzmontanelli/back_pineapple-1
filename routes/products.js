const express = require("express");

const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} = require("../controllers/productController");

const router = express.Router();

router.get("/:id", getOne);
router.delete("/delete/:id", deleteOne);
router.put("/update/:id", updateOne);
router.get("/", getAll);
router.post("/add", create);

module.exports = router;
