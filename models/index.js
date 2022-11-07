const Users = require("./User");
const CartItem = require("./cartItem");
const OrderItem = require("./orderItem");
const Product = require("./product");
const Brand = require("./Brand")
const Comment = require("./Comment");

CartItem.belongsTo(Users);
Product.belongsToMany(CartItem, { through: "Cart" });

OrderItem.belongsTo(Users);
Product.belongsToMany(OrderItem, { through: "Order" });

// Product.belongsTo(Brand)
// Brand.hasMany(Product)

Product.hasMany(Comment, { foreignKey: "productId" });
Users.hasMany(Comment, { foreignKey: "userId" });

module.exports = { Users, CartItem, OrderItem, Product, Comment, Brand};

