const express = require("express");
const router = express.Router();
const { postComment, getComment } = require("../controllers/commentControler");
const { validateAuth } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/:id", getComment);
router.post("/:productId", validateAuth, postComment);

module.exports = router;
