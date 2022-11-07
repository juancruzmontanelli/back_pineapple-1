const express = require("express");
const cookieParser = require("cookie-parser");
// const cart = require("../models/cart");
const router = express.Router();
const {
  deleteCart,
  editProduct,
  addProduct,
  buyProducts,
  cartStory,
  addMultiProduct,
} = require("../controllers/cartControler");

const { validateAuth } = require("../middlewares/auth");
router.use(cookieParser());

// Ruta para agregar productos al carrito
router.post("/", validateAuth, addProduct);

// Ruta para editar la cantidad del producto
router.put("/:id", validateAuth, editProduct);

//Ruta para eliminar productos al carrito
router.delete("/:id", validateAuth, deleteCart);

router.post("/buy", validateAuth, buyProducts);

router.get("/history", validateAuth, cartStory);

router.post("/multiProducts", validateAuth, addMultiProduct);

module.exports = router;
