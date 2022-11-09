const express = require("express");

const {
  create,
  updateOne,
  deleteOne,
} = require("../controllers/brandController");
const { validateAuth, validateAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", validateAuth, validateAdmin, create);

router.put("/update/:name", validateAuth, validateAdmin, updateOne);

router.delete("/delete/:name", validateAuth, validateAdmin, deleteOne);

module.exports = router;
