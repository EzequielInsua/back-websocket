const ContainerFile = require('../../Containers/ContainerFiles');

class ProductosDaoFile extends ContainerFile {

    constructor() {
        super('productos.json')
    }
}

module.exports = { ProductosDaoFile }
