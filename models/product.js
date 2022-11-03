const { Sequelize, Model } = require("sequelize");
const db = require("../config/db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    batteryCapacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    screenSize: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    resolutionX: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    resolutionY: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    processor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ram: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    internalStorage: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    rearCamera: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    frontCamera: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    operatingSystem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberOfSims: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.VIRTUAL,
      get() {
        return `Este dispositivo cuenta con una capacidad de bateria de ${this.batteryCapacity}, un tamano de la pantalla de ${this.screenSize}, una relsolucion X de ${this.resolutionX}, una relsolucion Y de ${this.resolutionY}, un procesador de ${this.processor}, una ram de ${this.ram}, un almacenamineto interno de ${this.internalStorage}, una camara Rear de ${this.rearCamera}, una camara frontal de ${this.frontCamera}, un sistema operativo de ${this.operatingSystem} y un numero de tarjetas Sims de ${this.numberOfSims}`;
      },
    },
  },
  { sequelize: db, modelName: "product" }
);

// hooks
Product.beforeBulkCreate((products) => {
  products.map((product) => {
    const name = (product.name = `${product.brand} ${product.model}`);

    return name;
  });
});
Product.beforeBulkCreate((products) => {
  products.map((product) => {
    const url = (product.url = product.name
      .replace(/\s+/g, "_")
      .replace(/\W/g, ""));

    return url;
  });
});

module.exports = Product;
