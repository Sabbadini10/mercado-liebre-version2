const {check, body} = require('express-validator');
const {loadUsers, cargarUsers} = require('../data/db_usersModules');
const bcryptjs = require('bcryptjs');

module.exports = [

    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = cargarUsers().find(user => user.email === req.body.email && bcryptjs.compareSync(value, user.password));
            return user ? true : false
        }).withMessage('Credenciales inválidas'),
    
]