// ************ Require's ************
const express = require('express');
const router = express.Router();
const logRuta = require('../../middleware/userLogs')
const admi = require('../../middleware/admi')



// ************ Controller Require ************
const {index, buscar, productos, admin, loginAdmin} = require('../controllers/mainController');

router
    .get('/', logRuta, index)
    .get('/buscar', logRuta, buscar)
    .get('/productos', logRuta, productos)
    .get('/admin', logRuta, admi,admin)
    .get('/loginAdmin', logRuta, loginAdmin)

module.exports = router;
