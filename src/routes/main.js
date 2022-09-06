// ************ Require's ************
const express = require('express');
const router = express.Router();
const logRuta = require('../../middleware/userLogs')




// ************ Controller Require ************
const {index, buscar, productos, admin, loginAdmin} = require('../controllers/mainController');

router
    .get('/', logRuta, index)
    .get('/buscar', logRuta, buscar)
    .get('/productos', logRuta, productos)

module.exports = router;
