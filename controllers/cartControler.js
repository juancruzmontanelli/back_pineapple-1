const { Users, OrderItem, Product, CartItem, Order } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
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

const addMultiProduct = (req, res, next) => {
  let attributes = ["id", "name", "img", "price"];
  const userId = req.user.id;
  const { products } = req.body;
  Promise.all(
    products.map((product) => {
      return Product.findOne({ where: { id: product.id } }).then(
        (productDb) => {
          return CartItem.findOne({
            where: {
              [Op.and]: [{ userId: userId }, { productId: productDb.id }],
            },
          }).then((productDbCart) => {
            if (productDbCart) {
              return CartItem.update(
                { quantity: product.quantity + productDbCart.quantity },
                { where: { id: productDbCart.id }, returning: true }
              ).then(([afect, update]) => update[0]);
            } else {
              return CartItem.create({
                productId: productDb.id,
                userId: userId,
                quantity: product.quantity,
              });
            }
          });
        }
      );
    })
  )
    .then(() =>
      CartItem.findAll({
        where: { userId: userId },
        include: [{ model: Product, attributes: attributes }],
      }).then((items) => res.send({ items }))
    )
    .catch(next);
};

const editProduct = (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;
  CartItem.update({ quantity: quantity }, { where: { productId: id } })
    .then(() => res.send(201))
    .catch(next);
};

const deleteCart = (req, res, next) => {
  const { id } = req.params;
  CartItem.destroy({ where: { productId: id } })
    .then(() => res.send(200))
    .catch(next);
};

const buyProducts = (req, res, next) => {
  const { id } = req.user;

  const testAccount = nodemailer.createTestAccount();

  let trasporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // sntp.gmail.com : si usamos gmail
    port: 587, // si usamos gmail esto tiene que ser 465
    secure: false, // si usamos gmail esto tiene que ser true
    auth: {
      user: "	lonie81@ethereal.email",
      pass: "E3v2XqwukaBseZbXNH",
    },
  });
  Users.findOne({ where: { id: id } })
    .then((user) => {
      CartItem.findAll({ where: { userId: id }, include:[Product]}).then((items) => {
        let productCard = ''
        items.map((item) => {
          productCard += `<h2>${item.product.name}</h2><img src="${item.product.img}"><p>$ ${item.product.price}</p>`
        })
        let sendInfo = {
          from: "remitente",
          to: "juancruzmontanelli@gmail.com",
          subject: "Compra realizada",
          html: `<body> <h1>Hola ${user.name}!</h1> <div>${productCard}</div> </body>`
        };
        Order.create({ userId: id}).then((order) => {
          const history = items.map((item) => {
            const { productId, userId, quantity } = item;
            return { productId, userId, quantity, orderId: order.id };
          });
          OrderItem.bulkCreate(history).then(() =>
            CartItem.destroy({
              where: { userId: id },
            }).then(() => {
              trasporter.sendMail(sendInfo, (err, info) => {
                err ? res.sendStatus(500) : res.send(sendInfo).status(204);
              });
             
            })
          );
        });
      });
    })
    .catch(next);
};

const cartStory = (req, res, next) => {
  const { id } = req.user;
  Order.findAll({ where: { userId: id }, include: [{model: OrderItem, include: [{model: Product}]}]})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

module.exports = {
  addProduct,
  deleteCart,
  editProduct,
  buyProducts,
  cartStory,
  addMultiProduct,
};
