const { Comment } = require("../models");
const { Product } = require("../models");

const getComment = (req, res, next) => {
  const { name } = req.params;
  Product.findOne({ where: { url: name } })
    .then((product) =>
      Comment.findAll({ where: { productId: product.id } }).then((comments) =>
        res.send(comments)
      )
    )
    .catch(next);
};

const postComment = (req, res, next) => {
  const { name } = req.params;
  const { id } = req.user;
  const { commit, rating } = req.body;
  Product.findOne({ where: { url: name } })
    .then((product) =>
      Comment.create({
        userId: id,
        productId: product.id,
        commit: commit,
        rating: rating,
      }).then((comment) => res.send(comment))
    )
    .catch(next);
};

module.exports = { getComment, postComment };
