const Brand = require("../models/Brand");
const Product = require("../models/product");
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
  Brand.findAll()
    .then((brands) => res.send(brands))
    .catch();
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Brand.bulkCreate(req.body).then((brands) => res.send(brands));
};

const updateOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }
  Brand.update(req.body, {where: {name: req.params.name }, returning: true})
  .then(([afect, updateName]) => {
    Product.findAll({where: {brand: req.params.name }})
  
    .then((products) => {
      let update = {
        brand : req.body.name
      }
      products.map((product) => {
        const name = `${req.body.name} ${product.model}`
        const url = (name
          .replace(/\s+/g, "_")
          .replace(/\W/g, ""));
         
          update.name = name
          update.url = url
          console.log(name)
          Product.update(update, {where: {id: product.id}, returning: true, individualHooks:true})
          .then(([afect, updateBrand]) => res.send(updateBrand))
      })
    
      }) 
  })
  
}

const deleteOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  Brand.destroy({ where: { name: req.params.name } })
    .then(() => {
      Product.destroy({ where: { brand: req.params.name } }).then(() =>
        res.sendStatus(202)
      );
    })
    .catch();
};
module.exports = {
  getAll,
  create,
  updateOne,
  deleteOne,
};
