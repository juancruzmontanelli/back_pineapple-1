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
  let { model, min, max } = req.query;
  if (!model) model = "1";
  if (!min) min = 0;
  if (!max) max = 10000000;
  Brand.findOne({ where: { name: model } })
    .then((brand) => {
      let query;
      if (brand)
        query = {
          [Op.and]: [
            { brand: brand.name },
            { price: { [Op.between]: [min, max] } },
          ],
        };
      if (model == "1") {
        query = { price: { [Op.between]: [min, max] } };
      }
      Product.findAll({
        where: query,
      }).then((products) => res.send(products));
    })
    .catch(next);
};

module.exports = { search, filter };
