const Product = require("../models/product");

const getAll = (req, res) => {
  Product.findAll()
    .then((products) => res.send(products))
    .catch();
};

const getOne = (req, res) => {
  Product.findOne({ where: { url: req.params.name } })
    .then((product) => res.send(product))
    .catch();
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.bulkCreate(req.body)
    .then((products) => res.send(products))
    .catch();
};

const updateOne = (req, res) => {
  Product.update(req.body, { where: { url: req.params.name }, returning: true })
    .then(([afect, update]) => res.send(update[0]))
    .catch();
};
const deleteOne = (req, res) => {
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
