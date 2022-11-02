const S = require("sequelize");
const db = require("../config/db");

class Order extends S.Model {}
Order.init(
  {
    id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: S.INTEGER,
      allowNull: false
    },
    orderDate: {
      type: S.DATE,
      allowNull: false
    },
    
  },
  {
    sequelize: db,
    modelName: "order",
  }
);
module.exports = Order