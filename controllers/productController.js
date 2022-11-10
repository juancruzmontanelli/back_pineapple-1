const Product = require("../models/product");
const { Comment } = require("../models/");
const { getPromedio, getPagingData } = require("../utils/index");
const { validationResult } = require("express-validator");

const getAll = (req, res, next) => {
  let { page } = req.query;
  page >= 1 ? (page -= 1) : null;
  Product.findAndCountAll({
    limit: 12,
    offset: page ? page * 12 : 0,
    include: [Comment],
  })
    .then((products) => {
      products.rows.map((product) => {
        product.setDataValue("promedio", getPromedio(product));
        return product;
      });
      const response = getPagingData(products, page);
      res.send(response);
    })
    .catch(next);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.bulkCreate(req.body)
    .then((products) => res.send(products))
    .catch();
};

const updateOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Product.update(req.body, { where: { url: req.params.name }, returning: true })
    .then(([afect, update]) => res.send(update[0]))
    .catch();
};
const deleteOne = (req, res) => {
  const errors = validationResult(req);
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
