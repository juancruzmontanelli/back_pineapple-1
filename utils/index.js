const getPromedio = (product) => {
  let suma = 0;
  let promedio = 0;
  product.comments.map((comment) => {
    comment.rating ? (suma += comment.rating) : (suma = 0);
    return comment;
  });
  product.comments.length !== 0
    ? (promedio = (suma / product.comments.length).toFixed(2))
    : (promedio = 0);
  return promedio;
};

module.exports = getPromedio;
