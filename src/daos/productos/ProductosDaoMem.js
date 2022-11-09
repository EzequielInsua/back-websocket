const ContainerMemory = require('../../containers/ContainerMemory.js')

class ProductosDaoMem extends ContainerMemory {
    constructor() {
        super('productos.json')
    }
}

module.exports = { ProductosDaoMem }
