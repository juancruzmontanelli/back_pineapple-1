const { Comment } = require("../models");
const { Product } = require("../models");
const { validationResult } = require("express-validator");
//rutas amigables agregadas
const getComment = (req, res, next) => {
  const { name } = req.params;
  Product.findOne({ where: { url: name } })
    .then((product) =>
      Comment.findAll({ where: { productId: product.id } }).then((comments) => {
        let suma = 0;
        let promedio = 0;
        comments.map((comment) => {
          suma += comment.rating;
          return comment;
        });
        promedio = (suma / comments.length).toFixed(2);
        res.send({ comments, promedio });
      })
    )
    .catch(next);
};

const postComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
