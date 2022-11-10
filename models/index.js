const Users = require("./User");
const CartItem = require("./cartItem");
const OrderItem = require("./orderItem");
const Product = require("./product");
const Brand = require("./Brand");
const Comment = require("./Comment");
const Order = require("./Order");

CartItem.belongsTo(Users);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

OrderItem.belongsTo(Users);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

// Product.belongsTo(Brand)
// Brand.hasMany(Product)

Product.hasMany(Comment, { foreignKey: "productId" });
Users.hasMany(Comment, { foreignKey: "userId" });

module.exports = { Users, CartItem, OrderItem, Product, Comment, Brand, Order };
