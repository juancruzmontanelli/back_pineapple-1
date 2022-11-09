const S = require("sequelize");
const db = require("../config/db");

class Order extends S.Model {}
Order.init(
  {
    userId: {
        type: S.INTEGER,
        allowNull: false
    }, 
    total: {
        type: S.FLOAT
    }, 
    status: {
        type: S.STRING
    }
  },
  {
    sequelize: db,
    modelName: "order",
  }
);

module.exports = Order;
