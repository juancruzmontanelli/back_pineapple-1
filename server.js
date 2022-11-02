const express = require("express");
const app = express();
const router = require("./routes");
//const db = require("./config/db");

// parsing middleware
app.use(express.json());
app.use("/api", router);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
 .then(() =>
   app.listen(3001, () => console.log("Servidor escuchando en el puerto 3001"))
 )
.catch(console.error);

// const PORT = 3001;
// app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
