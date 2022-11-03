const Product = require("../models/product");

const getAll = (req, res) => {
  Product.findAll()
    .then((products) => res.send(products))
    .catch();
};
const getOne = (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => res.send(product))
    .catch();
};
    const getAll = ((req, res) => {
        Product.findAll()
        .then((products) => res.send(products))
        .catch()
    })
    const getOne = ((req, res) => {
        Product.findByPk(req.params.id)
        .then((product) => res.send(product))
        .catch()
    })

    const create = ((req, res) => {
        Product.bulkCreate(req.body)
        .then((products) => res.send(products))
        .catch()
    })

    const updateOne = ((req, res) => {
        const id  = req.params.id 
        Product.update((req.body) , {where: { id }, returning: true})
        .then((productUpdate) => res.send(productUpdate))
        .catch()
    })
    const deleteOne = ((req, res) => {
        const id = req.params.id
        console.log(req.params.id)
        Product.destroy({where: { id }})
        .then(() => res.sendStatus(202))
        .catch()
    })

const updateOne = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, { where: { id }, returning: true })
    .then(([afect, update]) => res.send(update[0]))
    .catch();
};
const deleteOne = (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  Product.destroy({ where: { id } })
    .then(() => res.sendStatus(202))
    .catch();
};

module.exports = {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne 
}
