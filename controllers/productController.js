const Product = require("../models/product");
const { Comment } = require("../models/");
const getPromedio = require("../utils/index");

const getAll = (req, res) => {
  Product.findAll({ include: [Comment] })
    .then((products) => {
      let productsAndComments = products.map((product) => {
        product.setDataValue("promedio", getPromedio(product));
        return product;
      });
      res.send(productsAndComments);
    })
    .catch();
};

const getOne = (req, res) => {
  Product.findOne({ where: { url: req.params.name }, include: [Comment] })
    .then((product) => {
      product.setDataValue("promedio", getPromedio(product));
      res.send(product);
    })
    .catch();
};

const create = (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.bulkCreate(req.body)
    .then((products) => res.send(products))
    .catch();
};

const updateOne = (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.update(req.body, { where: { url: req.params.name }, returning: true })
    .then(([afect, update]) => res.send(update[0]))
    .catch();
};
const deleteOne = (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.destroy({ where: { url: req.params.name } })
    .then(() => res.sendStatus(202))
    .catch();
};

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
};
