const {check} = require('express-validator')

const productosValidados = [

    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 5
        }).withMessage('Cómo mínimo 5 caracteres'),

    check('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

    check('discount')
        .isInt({
            min : 0,
            max: 100
        }).withMessage('El descuento no puede ser mayor que 100').bail()
        .isNumeric({
            no_symbols : true,
        }).withMessage('Debe un número entero positivo'),

    check('description')
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({
            min : 20,
        }).withMessage('Cómo mínimo 5 caracteres'),

    check('category')
        .notEmpty().withMessage('La categoría es obligatoria')
]

module.exports  = productosValidados;