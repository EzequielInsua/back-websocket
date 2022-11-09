
const ContainerFirebase = require('../../Containers/ContainerFirebase')

class ProductosDaoFirebase extends ContainerFirebase {

    constructor() {
        super('productos')
    }
}

module.exports = { ProductosDaoFirebase }
