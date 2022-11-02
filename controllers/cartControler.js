const addProduct = (req, res) => {
  console.log(`Called addProduct ${req.originalUrl}`);
  res.status(201).send({
    añadir: "producto",
  });
};

const editProduct = (req, res) => {
  console.log(`Called editProduct ${req.originalUrl}`);
  // Users.create(req.body).then((user) => res.status(201).send(user));
  res.status(201).send({
    editar: "producto",
  });
};

const deleteCart = (req, res) => {
  console.log(`Called deleteCart ${req.originalUrl}`);
  // Users.create(req.body).then((user) => res.status(201).send(user));
  res.status(200).send({
    producto: "eliminado",
  });
};

module.exports = { addProduct, deleteCart, editProduct };
