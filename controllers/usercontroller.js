const { Users } = require("../models");
const { generateToken } = require("../config/tokens");

const userRegister = (req, res, next) => {
  Users.create(req.body)
    .then((result) => result)
    .then(({ id, name, address, email }) =>
      res.send({ id, name, address, email })
    )
    .catch(next);
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: isAdmin,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
};

const userLogout = (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
};

const userData = (req, res) => {
  res.send(req.user);
};

const userUpdate = (req, res, next) => {
  const { id } = req.params;
  Users.update(req.body, {
    where: { id: id },
    returning: true,
  })
    .then(([afect, update]) => res.send(update[0]))
    .catch(next);
};

const allUsers = (req, res, next) => {
  Users.findAll()
    .then((users) => res.send(users))
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  Users.destroy({ where: { id: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userData,
  userUpdate,
  allUsers,
  deleteUser,
};
