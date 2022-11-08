const {Sequelize, Model} = require("sequelize");
const db = require("../config/db")


class Brand extends Model {}

Brand.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize: db, modelName: "brands"})

module.exports = Brand;