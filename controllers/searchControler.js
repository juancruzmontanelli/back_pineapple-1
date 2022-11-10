const { Brand, Product, Comment } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const { getPromedio, getPagingData } = require("../utils/index");

const search = (req, res, next) => {
  let { page, str } = req.query;
  page >= 1 ? (page -= 1) : null;
  str.toLowerCase();
  Product.findAndCountAll({
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + str + "%"
      ),
    },
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
