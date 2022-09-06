const fs = require("fs");
const path = require("path");
const {
    loadProductos,
    tiendaProductos,
    loadCategorias,
} = require("../data/db-modules");
const { validationResult } = require("express-validator");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controllerProductos = {
    // Root - Show all products
    index: (req, res) => {
        const productos = loadProductos();
        return res.render("index", {
            productos,
            toThousand,
        });
    },

    // Detail - Detail from one product
    detalle: (req, res) => {
        const productos = loadProductos();
        const producto = productos.find(
            (producto) => producto.id === +req.params.id
        );

        return res.render("detalle", {
            producto,
            toThousand,
        });
    },

    // Create - Form to create
    crear: (req, res) => {
        const producto = loadProductos();
        res.render("producto-crear-form", {
            producto,
            categorias: loadCategorias().sort(),
        });
        res.redirect("/detalle/" + req.params.id);
    },

    // Create -  Method to store
    tienda: (req, res) => {
        let errors = validationResult(req);
        errors = errors.mapped();
        if (req.fileValidationError) {
            errors = {
                ...errors,
                images: {
                    msg: req.fileValidationError,
                },
            };
        }

            if(Object.entries(errors).length === 0){
            const productos = loadProductos();
            const { name, price, discount, category, description } = req.body;
            const id = productos[productos.length - 1].id;
            let image;
            if (req.files.length > 0) {
                image = req.files.map((image) => image.filename);
            }

            const nuevoProducto = {
                id: id + 1,
                ...req.body,
                name: name.trim(),
                price: +price,
                discount: +discount,
                description: description.trim(),
                image: image ? image : ["default-image.png"],
            };

            const productosNuevo = [...productos, nuevoProducto];

            tiendaProductos(productosNuevo);

            return res.redirect("/");
        } 
        else{
            if(req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,'..','public','images','productos',filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','public','images','productos',filename))
                })
            }
            return res.render('producto-crear-form',{
                categorias : loadCategorias().sort(),
                errors,
                old : req.body
            })
        }
    
    },

    // Update - Form to edit
    editar: (req, res) => {
        const productos = loadProductos();
        const producto = productos.find((producto) => producto.id === +req.params.id);
        return res.render("producto-editar-form", {
            categorias: loadCategorias().sort(),
            producto,
        });
    },
    // Update - Method to update
    cambiar: (req, res) => {
        const productos = loadProductos();
        const { id } = req.params;
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, price, discount, category, description } = req.body;

            const productosModificados = productos.map((producto) => {
                if (producto.id === +id) {
                    return {
                        ...producto,
                        name: name.trim(),
                        price: +price,
                        discount: +discount,
                        category,
                        description,
                    };
                }
                return productos;
            });

            tiendaProductos(productosModificados);
            return res.redirect("/productos/detalle/" + req.params.id);
        } else {
            return res.render("producto-editar-form", {
                categorias: loadCategorias().sort(),
                productos: loadProductos().find(
                    (producto) => producto.id === +req.params.id
                ),
                errors: errors.mapped(),
            });
        }
    },

    // Delete - Delete one product from DB
    remover: (req, res) => {
        const productos = loadProductos();

        const productosModificados = productos.filter(
            (producto) => producto.id !== +req.params.id
        );
        tiendaProductos(productosModificados);

        return res.redirect("/");
    },
};

module.exports = controllerProductos;
