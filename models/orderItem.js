const S = require("sequelize");
const db = require("../config/db");

class OrderItem extends S.Model {}
OrderItem.init(
  {
    productId: {
      type: S.INTEGER,
      allowNull: false,
    },
    userId: {
      type: S.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: S.INTEGER
    }
  },

  {
    sequelize: db,
    modelName: "orderItems",
  }
);

module.exports = OrderItem;
