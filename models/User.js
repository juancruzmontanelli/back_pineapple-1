const s = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
class Users extends s.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.pass
    );
  }
}

Users.init(
  {
    id: {
      type: s.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: s.STRING,
      allowNull: false,
    },
    address: {
      type: s.STRING,
      allowNull: false,
    },
    email: {
      type: s.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    salt: {
      type: s.STRING,
    },
    pass: {
      type: s.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: s.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.pass, salt).then((hash) => {
    user.pass = hash;
  });
});

module.exports = Users;
