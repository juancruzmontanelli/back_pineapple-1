const express = require("express");
// const cart = require("../models/cart");
const router = express.Router();
const {
  deleteCart,
  editProduct,
  addProduct,
} = require("../controllers/cartControler");

// Ruta para agregar productos al carrito
router.post("/", addProduct);

// Ruta para editar la cantidad del producto
router.put("/:id", editProduct);

//Ruta para eliminar productos al carrito
router.delete("/:id", deleteCart);

module.exports = router;
