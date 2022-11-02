const { Users, OrderItem, Product, CartItem } = require("../models");

const addProduct = (req, res, next) => {
  const { id, quantity } = req.body;
  Users.findOne({ where: { id: "1" } })
    .then((user) =>
      Product.findOne({ where: { id: id } }).then((product) => {
        CartItem.create({
          productId: product.id,
          userId: user.id,
          quantity: quantity,
        }).then((cart) => res.send(cart));
      })
    )
    .catch(next);
};

const editProduct = (req, res) => {
  console.log(`Called editProduct ${req.originalUrl}`);
  // Users.create(req.body).then((user) => res.status(201).send(user));
  res.status(201).send({
    editar: "producto",
  });
};

const deleteCart = (req, res) => {
  console.log(`Called deleteCart ${req.originalUrl}`);
  // Users.create(req.body).then((user) => res.status(201).send(user));
  res.status(200).send({
    producto: "eliminado",
  });
};

const buyProducts = (req, res, next) => {
  const { id } = req.body;
  CartItem.findAll({ where: { userId: id } })
    .then((items) => {
      OrderItem.bulkCreate(items).then(() =>
        CartItem.destroy({
          where: { userId: id },
        }).then(() => res.send(204))
      );
    })
    .catch(next);
};

module.exports = { addProduct, deleteCart, editProduct, buyProducts };
