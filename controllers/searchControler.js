const { Brand, Product } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const search = (req, res, next) => {
  let str = req.query.str;
  str.toLowerCase();
  Product.findAll({
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + str + "%"
      ),
    },
  })
    .then((products) => res.send(products))
    .catch(next);
};

const filter = (req, res, next) => {
  const { model, price } = req.query;
  Brand.findOne({ where: { name: model } })
    .then((brand) =>
      Product.findAll({
        where: { brand: brand.id, price: { [Op.between]: price } },
      }).then((products) => res.send(products))
    )
    .catch(next);
};

module.exports = { search, filter };
