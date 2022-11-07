const express = require("express");
const router = express.Router();
const { search, filter } = require("../controllers/searchControler");

router.get("/", search);
router.get("/filter", filter);

module.exports = router;
