// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/cargarFotoProducto'); 
const logRuta = require('../../middleware/userLogs')

const productosValidados = require('../validations/productosValidados')

// ************ Controller Require ************
const {index, crear, remover, tienda, editar, cambiar, detalle} = require('../controllers/productosController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', logRuta, index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', logRuta, crear); 
router.post("/crear", upload.array("image"), logRuta, productosValidados, tienda);


/*** GET ONE PRODUCT ***/ 
router.get('/detalle/:id/', logRuta, detalle); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/editar/:id/', logRuta, editar); 
router.put('/editar/:id/', logRuta, productosValidados, cambiar); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/eliminar/:id', logRuta, remover); 


module.exports = router;
