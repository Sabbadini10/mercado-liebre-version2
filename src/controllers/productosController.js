const fs = require('fs');
const path = require('path');
const { loadProductos ,tiendaProductos } = require('../data/db-modules')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
	const productos = loadProductos();
    return res.render("index",{
      productos,
      toThousand
    });
	},

	// Detail - Detail from one product
	detalle: (req, res) => {
        const productos = loadProductos();
        const producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('detalle', {
            producto,
            toThousand
        })
	},

	// Create - Form to create
	crear: (req, res) => {
			const productos = loadProductos();
			res.render('producto-crear-form',{
				productos
			})
            res.redirect('/detalle/'+ req.params.id)
	},
	
	// Create -  Method to store
	tienda: (req, res) => {
		const productos = loadProductos();
        const {name,price,discount,category,image} = req.body;
        const id = productos[productos.length - 1].id;

        const nuevoProducto = {
            id : id + 1,
            ...req.body,
            name: name.trim(),
            price : +price,
            discount : +discount,
            category,
            image
        }

        const productosNuevo = [...productos,nuevoProducto];

        tiendaProductos(productosNuevo)

        return res.redirect('/')
	},

	// Update - Form to edit
	editar: (req, res) => {
		const productos = loadProductos();
        const producto = productos.find(product => product.id === +req.params.id);
        return res.render('producto-editar-form',{
            producto
        })
	},
	// Update - Method to update
	cambiar: (req, res) => {
		const productos = loadProductos();
        const {id} = req.params;
        const {name,price,discount,category, description} = req.body;

        const productosModificados = productos.map(producto => {
            if (producto.id === +id ){
                return {
                    ...producto,
                    name : name.trim(),
                    price : +price,
                    discount : +discount,
                    category,
                    description
                }
            }
            return producto
        })

       tiendaProductos(productosModificados)
        return res.redirect('/productos')

	},

	// Delete - Delete one product from DB
	remover : (req, res) => {
		const productos = loadProductos();

        const productosModificados = productos.filter(producto => producto.id !== +req.params.id )
        tiendaProductos(productosModificados);
        
        return res.redirect('/productos')

	}
};

module.exports = controller;