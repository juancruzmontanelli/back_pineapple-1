const { Comment } = require("../models");

const getComment = (req, res, next) => {
  const { id } = req.params;
  Comment.findAll({ where: { productId: id } })
    .then((comments) => res.send(comments))
    .catch(next);
};

const postComment = (req, res, next) => {
  const { id } = req.params;
  const { userId, commit, rating } = req.body;
  Comment.create({
    userId: userId,
    productId: id,
    commit: commit,
    rating: rating,
  })
    .then((comment) => res.send(comment))
    .catch(next);
};

module.exports = { getComment, postComment };
