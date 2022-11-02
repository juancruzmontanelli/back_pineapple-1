const S = require("sequelize");
const db = require("../config/db");

class OrderItem extends S.Model {}
OrderItem.init(
  {
    productId: {
      type: S.INTEGER,
      allowNull: false,
    },
    idUser: {
      type: S.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    modelName: "orderItems",
  }
);

module.exports = OrderItem;
