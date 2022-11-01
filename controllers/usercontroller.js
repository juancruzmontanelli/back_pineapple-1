const { Users } = require("../models");
const { generateToken } = require("../config/tokens");

const userRegister = (req, res, next) => {
  Users.create(req.body)
    .then((result) => res.send(result))
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

module.exports = { userRegister, userLogin, userLogout, userData };
