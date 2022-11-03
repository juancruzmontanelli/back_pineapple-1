const express = require("express");
const router = express.Router();
const { postComment, getComment } = require("../controllers/commentControler");

router.get("/:id", getComment);
router.post("/:id", postComment);

module.exports = router;
