const express = require("express");

const {
    getAll,
    create,
    updateOne,
    deleteOne,
  } = require("../controllers/brandController"); 

const router = express.Router();

router.get("/", getAll);
router.post('/add', create)

router.put('/update/:name', updateOne)

router.delete('/delete/:name', deleteOne)

module.exports = router;