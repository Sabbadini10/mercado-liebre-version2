const {check, body} = require('express-validator');
const {cargarUsers, crearUsers} = require('../data/db_usersModules');

module.exports = [
    check('first_name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo 2 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos'),

    check('last_name')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo 2 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido').bail()
        .custom((value, {req}) => {
            const user = cargarUsers().find(user => user.email === value);

            if(user){
                return false
            }else {
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min : 6, 
            max : 12
        }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
]