const s = require("sequelize");
const db = require("../config/db");

class Comment extends s.Model {}

Comment.init(
  {
    id: {
      type: s.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: s.INTEGER,
      allowNull: false,
    },
    productId: {
      type: s.INTEGER,
      allowNull: false,
    },
    commit: {
      type: s.TEXT,
      allowNull: false,
    },
    rating: {
      type: s.INTEGER,
    },
  },
  { sequelize: db, modelName: "comment" }
);

module.exports = Comment;
