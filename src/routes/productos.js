// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/cargarFotoProducto'); 


// ************ Controller Require ************
const {index, crear, remover, tienda, editar, cambiar, detalle} = require('../controllers/productosController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', crear); 
router.post('/crear',upload.array('image'),tienda); 


/*** GET ONE PRODUCT ***/ 
router.get('/detalle/:id/', detalle); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/editar/:id/', editar); 
router.put('/editar/:id/',cambiar); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/eliminar/:id', remover); 


module.exports = router;
