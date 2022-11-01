const { Users } = require("../models");

const userRegister = (req, res, next) => {
  Users.create(req.body)
    .then((result) => res.send(result))
    .catch(next);
};

module.exports = { userRegister };
