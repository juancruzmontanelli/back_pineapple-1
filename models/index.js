const Users = require("./User");
//const Cart = require("./cart");
const CartItem = require("./cartItem");
//const Order = require("./order");
const OrderItem = require("./orderItem");
const Product = require("./product");

CartItem.belongsTo(Users);
Product.belongsToMany(CartItem, { through: "Cart" });

OrderItem.belongsTo(Users);
Product.belongsToMany(OrderItem, { through: "Order" });

module.exports = { Users, CartItem, OrderItem, Product };
