const express = require("express");
const Brand = require('../models/Brand')
const router = express.Router();


router.post('/add', (req, res) => {
    Brand.bulkCreate(req.body)
    .then((brands) => res.send(brands))
})

module.exports = router;