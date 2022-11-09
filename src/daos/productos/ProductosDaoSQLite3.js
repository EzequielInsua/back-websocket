const ContainerSQL = require('../../containers/ContainerSQL')
const config = require('../../../config/config')

class ProductosDaoSQLite3 extends ContainerSQL {

    constructor() {
        super(config.sqlite3, 'productos')
    }
}

module.exports = { ProductosDaoSQLite3 }
