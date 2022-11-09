const { Sequelize, Model } = require("sequelize");
const db = require("../config/db");
const { beforeUpdate } = require("./Brand");
const Brand = require("./Brand");

class Product extends Model {}

Product.init(
  {
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
        return `Este dispositivo cuenta con una capacidad de bateria de ${this.batteryCapacity} mAh, un tamaño de la pantalla de ${this.screenSize} pulgadas, una resolucion de ${this.resolutionX} x ${this.resolutionY}, un procesador de ${this.processor}, una ram de ${this.ram}, un almacenamineto interno de ${this.internalStorage} MB, una camara Rear de ${this.rearCamera}, una camara frontal de ${this.frontCamera}, un sistema operativo de ${this.operatingSystem} y un numero de tarjetas Sims de ${this.numberOfSims}`;
      },
    },
  },
  { sequelize: db, modelName: "product" }
);

// hooks
Product.beforeBulkCreate((products) => {
  console.log(products)
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

Product.beforeBulkCreate((products) => {
  products.map((product) => {
    Brand.findOrCreate({ where: { name: product.brand } });
  });
});

// Product.beforeBulkUpdate((...product) => {
//   console.log(...product)
//   const  name = (product.name = `${product.brand} ${product.model}`);
//   return name
// })

// Product.afterUpdate((product) => {
//   console.log(product)
//   this.name =`${product.brand} ${product.model}`
// })

// Product.beforeBulkUpdate((products) => {
//   products.map((product) => {
//     Brand.update({ where: { name: product.brand } });
//   });
// });
module.exports = Product;
