const fs = require("fs");
const path = require("path");

const loadProductos = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "./productsDataBase.json"), "utf-8")
  );
};

const tiendaProductos = (productos) => {
    fs.writeFileSync(path.join(__dirname,'./productsDataBase.json'), JSON.stringify(productos, null, 3),'utf8')
}

const loadCategorias = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, './categorias.json'),'utf-8'))
}


module.exports = { 
  loadProductos, 
  tiendaProductos, 
  loadCategorias 
};
