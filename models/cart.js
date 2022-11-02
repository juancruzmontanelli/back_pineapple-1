const S = require("sequelize");
const db = require("../config/db");

class Cart extends S.Model {}
Cart.init(
  {
    id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "cart",
  }
);

module.exports = Cart;
