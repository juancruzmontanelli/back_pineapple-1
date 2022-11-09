const Brand = require("../models/Brand");
const Product = require("../models/product");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  Brand.findAll()
    .then((brands) => res.send(brands))
    .catch();
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Brand.bulkCreate(req.body).then((brands) => res.send(brands));
};

const updateOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Brand.update(req.body, { where: { name: req.params.name }, returning: true })
    .then(([afect, updateName]) => {
      Product.update(
        { brand: req.body.name },
        {
          where: { brand: req.params.name },
          individualHooks: true,
          returning: true,
        }
      ).then(([afect, updateBrand]) =>
        res.send({ updateName: updateName[0], updateBrand: updateBrand[0] })
      );
    })
    .catch();
};

const deleteOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Brand.destroy({ where: { name: req.params.name } })
    .then(() => {
      Product.destroy({ where: { brand: req.params.name } }).then(() =>
        res.sendStatus(202)
      );
    })
    .catch();
};
module.exports = {
  getAll,
  create,
  updateOne,
  deleteOne,
};
