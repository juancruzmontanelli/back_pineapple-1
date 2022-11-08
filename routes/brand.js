const express = require("express");

const {
    create,
    updateOne,
    deleteOne,
  } = require("../controllers/brandController"); 

const router = express.Router();


router.post('/add', create)

router.put('/update/:name', updateOne)

router.delete('/delete/:name', deleteOne)

module.exports = router;