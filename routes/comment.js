const express = require("express");
const router = express.Router();
const { postComment, getComment } = require("../controllers/commentControler");
const { validateAuth, validateComment } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
//rutas amigables agregadas
router.get("/:name", getComment);
router.post("/:name", validateAuth, validateComment, postComment);

module.exports = router;
