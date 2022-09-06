const express = require('express');
const router = express.Router();
const { prosesarRegistro, registro, login, perfil, procesarLogin} = require('../controllers/usersControllers');
const uploadAvatar = require('../../middleware/cargarAvatar');
const loginValidator= require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator')


router
  .get('/register',registro) // /users/register
  
  .post('/register',uploadAvatar.single("avatar"), registerValidator, prosesarRegistro)
  
  .get('/login',login) // /users/login

  .post('/login', procesarLogin)
  
  .get('/perfil',perfil) // /users/profile
  
  .put('/update/:id',uploadAvatar.single('avatar'), perfil)


module.exports = router