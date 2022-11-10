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

const getPagingData = (data, page) => {
  const { count: totalItems, rows: products } = data;
  const currentPage = page ? page + 1 : 1;
  const totalPages = Math.ceil(totalItems / 12);
  return { totalItems, products, totalPages, currentPage };
};

module.exports = { getPromedio, getPagingData };
