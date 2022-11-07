const { Users, OrderItem, Product, CartItem } = require("../models");

/* Para hacer con bulkcreate tienes que pasar un array de objetos
1.- Desde el front cuando esta deslogueado guarda en localstorage un array de objetos
El array debe estar de la siguiente forma ejemplo: [{ id : 'product id', quantity : '1'}]
2.- Cuando se loguea al back se le pasa estes array de localstorage
3.- A este array se le hace un map:
array.map( (item)  => return { productId: item.id, userId: userId, quantity: item.quantity })


*/

const addProduct = (req, res, next) => {
  const userId = req.user.id;
  const { id, quantity } = req.body;
  Users.findOne({ where: { id: userId } })
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

const editProduct = (req, res, next) => {
  const { id, quantity } = req.body;
  CartItem.update({ quantity: quantity }, { where: { id: id } })
    .then(() => res.send(201))
    .catch(next);
};

const deleteCart = (req, res, next) => {
  const { id } = req.body;
  CartItem.destroy({ where: { id: id } })
    .then(() => res.send(200))
    .catch(next);
};

const buyProducts = (req, res, next) => {
  const { id } = req.user;
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

const cartAll = (req, res, next) => {
  const { id } = req.user;
  CartItem.findAll({ where: { userId: id } })
    .then((items) => res.status(200).send(items))
    .catch(next);
};

module.exports = { addProduct, deleteCart, editProduct, buyProducts, cartAll };
