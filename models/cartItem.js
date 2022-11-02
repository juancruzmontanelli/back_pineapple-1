const S = require("sequelize");
const db = require("../db");

class CartItem extends S.Model {}

CartItem.init(
  {
    id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: S.INTEGER,
      allowNull: false,
    },
    cartId: {
      type: S.INTEGER,
      allowNull: false,
      // Q: Quieres foreign key (llave extranjero)?
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    // Q: Este debe ser plural o singular? Tambien, camelCase o snake_case?
    modelName: "cartItem",
  }
);
module.exports = CartItem;
