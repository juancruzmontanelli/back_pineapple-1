const getPromedio = (product) => {
  let suma = 0;
  let promedio = 0;
  product.comments.map((comment) => {
    suma += comment.rating;
    return comment;
  });
  promedio = (suma / product.comments.length).toFixed(2);
  return promedio;
};

module.exports = getPromedio;
