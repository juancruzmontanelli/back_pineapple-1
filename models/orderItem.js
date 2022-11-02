const S = require("sequelize");
const db = require("../config/db");

class OrderItem extends S.Model {}
OrderItem.init(
  {
    orderId: {
      type: S.INTEGER,
      allowNull: false,
    },
    productId: {
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
