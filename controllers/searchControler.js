const { Brand, Product } = require("../models");

const search = (req, res, next) => {
  const { str } = req.body;
  Product.findAll({
    where: {
      name: {
        [Op.like]: `%${str}%`,
      },
    },
  })
    .then((products) => res.send(products))
    .catch(next);
};

const filter = (req, res, next) => {
  const { model, price } = req.body;
  Brand.findOne({ where: { name: model } })
    .then((brand) =>
      Product.findAll({
        where: { brand: brand.id, price: { [Op.between]: price } },
      }).then((products) => res.send(products))
    )
    .catch(next);
};

module.exports = { search, filter };
