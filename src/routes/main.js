// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {index, buscar, productos} = require('../controllers/mainController');

router.get('/', index); 
router.get('/buscar', buscar);
router.get('/productos', productos);

module.exports = router;
