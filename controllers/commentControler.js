const { Comment } = require("../models");

const getComment = (req, res, next) => {
  const { id } = req.params;
  Comment.findAll({ where: { productId: id } })
    .then((comments) => res.send(comments))
    .catch(next);
};

const postComment = (req, res, next) => {
  const { productId } = req.params;
  const { id } = req.user;
  const { commit, rating } = req.body;
  Comment.create({
    userId: id,
    productId: productId,
    commit: commit,
    rating: rating,
  })
    .then((comment) => res.send(comment))
    .catch(next);
};

module.exports = { getComment, postComment };
