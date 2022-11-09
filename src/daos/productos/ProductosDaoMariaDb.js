const ContainerSQL = require('../../containers/ContainerSQL');
const config = require('../../../config/config');
import config from '../../config.js'

class ProductosDaoMariaDb extends ContainerSQL {

    constructor() {
        super(config.mariaDb, 'productos')
    }
}

module.exports = { ProductosDaoMariaDb }
