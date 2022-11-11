const { Users } = require("../models");
const { generateToken } = require("../config/tokens");
const { Op } = require("sequelize");

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
        SuperAdmin: user.SuperAdmin,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
};

const userUpdateQuery = (req, res, next) => {
  req.body.pass == "" ? delete req.body.pass : req.body.pass;
  const { id } = req.user;
  Users.update(req.body, {
    where: { id: id },
    individualHooks: true,
    returning: true,
  })
    .then(([afect, update]) => {
      const { id, name, address, email, isAdmin, SuperAdmin } = update[0];
      res.send({ id, name, address, email, isAdmin, SuperAdmin });
    })
    .catch(next);
};

const userAllQuery = (req, res, next) => {
  let attributes = ["id", "name", "address", "email", "isAdmin", "SuperAdmin"];
  Users.findAll({
    where: {
      [Op.and]: [{ id: { [Op.ne]: 1 } }, { id: { [Op.ne]: req.user.id } }],
    },
    attributes: attributes,
    order: [["id", "ASC"]],
  })
    .then((users) => {
      res.send(users);
    })
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

const userAdminUpdateQuery = (req, res, next) => {
  const { id } = req.body;
  Users.update(req.body, {
    where: { id: id },
    individualHooks: true,
    returning: true,
  })
    .then(([afect, update]) => {
      const { id, name, address, email, isAdmin, SuperAdmin } = update[0];
      res.send({ id, name, address, email, isAdmin, SuperAdmin });
    })
    .catch(next);
};

const userPromoteAdminQuery = (req, res, next) => {
  const { id, isAdmin } = req.body;
  let revoque;
  isAdmin ? (revoque = false) : (revoque = true);
  Users.update(
    { isAdmin: revoque },
    {
      where: { id: id },
      returning: true,
    }
  )
    .then(([afect, update]) => {
      const { id, name, address, email, isAdmin } = update[0];
      res.send({ id, name, address, email, isAdmin });
    })
    .catch(next);
};

module.exports = {
  userRegisterQuery,
  userLoginQuery,
  userUpdateQuery,
  userAllQuery,
  deleteUserQuery,
  deleteUserQueryAdmin,
  userAdminUpdateQuery,
  userPromoteAdminQuery,
};
