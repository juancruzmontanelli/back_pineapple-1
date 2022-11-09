const { Users } = require("../models");
const { generateToken } = require("../config/tokens");

const userRegisterQuery = (req, res, next) => {
  Users.create(req.body)
    .then((result) => result)
    .then(({ id, name, address, email }) =>
      res.send({ id, name, address, email })
    )
    .catch(next);
};

const userLoginQuery = (req, res) => {
  const { email, pass } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(pass).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        pass: user.pass,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
};

const userUpdateQuery = (req, res, next) => {
  const { id } = req.user;
  Users.update(req.body, {
    where: { id: id },
    individualHooks: true,
    returning: true,
  })
    .then(([afect, update]) => {
      const { id, name, address, email, isAdmin, pass } = update[0];
      res.send({ id, name, address, email, isAdmin, pass });
    })
    .catch(next);
};

const userAllQuery = (req, res, next) => {
  let attributes = ["id", "name", "address", "email", "isAdmin"];
  Users.findAll({ attributes: attributes })
    .then((users) => res.send(users))
    .catch(next);
};

const deleteUserQuery = (req, res, next) => {
  const { id } = req.user;
  Users.destroy({ where: { id: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
};

const deleteUserQueryAdmin = (req, res, next) => {
  const { id } = req.params;
  Users.destroy({ where: { id: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = {
  userRegisterQuery,
  userLoginQuery,
  userUpdateQuery,
  userAllQuery,
  deleteUserQuery,
  deleteUserQueryAdmin,
};
