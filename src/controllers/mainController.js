const { loadProductos } = require('../data/db-modules');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controllerIndex = {
	index: (req, res) => {
		let productos = loadProductos();
		let productosVisitado = productos.filter(producto => producto.category == 'visited');
		let productosOferta = productos.filter(producto => producto.category == 'in-sale');
		return res.render('index', {
			productosVisitado,
			productosOferta,
			toThousand
		})
	},
	productos: (req, res) => {
		let productos = loadProductos()
		const producto = productos.find(product => product.id === +req.params.id);
		return res.render('productos', {
				productos,
				toThousand
		})

	},
	buscar: (req, res) => {
		// Do the magic
		let {keywords} = req.query;
		let productos = loadProductos();
		let resultado = productos.filter(producto => producto.name.toLowerCase().includes(keywords))
		return res.render('resultados', {
			keywords,
			resultado,
			toThousand
		})
	}
};

module.exports = controllerIndex;
