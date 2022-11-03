const Users = require("./User");
//const Cart = require("./cart");
const CartItem = require("./cartItem");
//const Order = require("./order");
const OrderItem = require("./orderItem");
const Product = require("./product");
const Brand = require("./Brand")

CartItem.belongsTo(Users);
Product.belongsToMany(CartItem, { through: "Cart" });

OrderItem.belongsTo(Users);
Product.belongsToMany(OrderItem, { through: "Order" });

// Product.belongsTo(Brand)
// Brand.hasMany(Product)

module.exports = { Users, CartItem, OrderItem, Product };
