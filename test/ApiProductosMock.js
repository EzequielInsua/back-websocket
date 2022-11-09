const knex = require("knex");

const {Products} = require('../controller/products.controller');
const {generarProducto} = require('./generarProducto');

class ApiProductoMock extends Products{
    constructor(config, tableName) {
        super(config, tableName);
    }

    async popular(cant = 5) {
        const nuevos = []
        for (let i = 1; i <= cant; i++) {
            const nuevoProducto = await generarProducto();
            nuevos.push(nuevoProducto);
        }
        return {wasError: false, data: nuevos};
    }
}

module.exports = {ApiProductoMock};