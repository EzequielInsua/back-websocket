const config = require('../../config/config');

let productosDao
let carritosDao
let mensajesDao

switch (config.TypeDB) {
    case 'json':
        const {ProductosDaoFile } = require('./productos/ProductosDaoFile.js')
        const {CarritosDaoFile } = require('./carritos/CarritosDaoFile.js')

        productosDao = new ProductosDaoFile()
        carritosDao = new CarritosDaoFile()
        break
    case 'firebase':
        // const {ProductosDaoFirebase } = require('./productos/ProductosDaoFirebase.js');
        // const {CarritosDaoFirebase } = require('./carritos/CarritosDaoFirebase.js');
        
        // productosDao = new ProductosDaoFirebase();
        // carritosDao = new CarritosDaoFirebase();    

        break
    case 'mongodb':
        const { ProductosDaoMongoDb } = require('./productos/ProductosDaoMongoDb.js');
        // const { CarritosDaoMongoDb } = require('./carritos/CarritosDaoMongoDb.js');
        productosDao = new ProductosDaoMongoDb();
        // carritosDao = new CarritosDaoMongoDb();
        break
    case 'mariadb':
        const {ProductosDaoMariaDb } = require('./productos/ProductosDaoMongoDb.js');
        const {CarritosDaoMariaDb } = require('./carritos/CarritosDaoMongoDb.js');
                
        productosDao = new ProductosDaoMariaDb();
        carritosDao = new CarritosDaoMariaDb();
        break
    case 'sqlite3':
        const {ProductosDaoSQLite3 } = require('./productos/ProductosDaoMongoDb.js');
        const {CarritosDaoSQLite3 } = require('./carritos/CarritosDaoMongoDb.js');
        
        productosDao = new ProductosDaoSQLite3();
        carritosDao = new CarritosDaoSQLite3();
        break
    default:
        break
}

module.exports = { productosDao, carritosDao }