const {faker} = require('@faker-js/faker');
faker.locale = 'es'

function generarProducto(){
    return ({
        title: faker.vehicle.vehicle(),
        price: faker.commerce.price(10000, 200000, 0),
        thumbnail: faker.image.transport()
    })
}
module.exports = {generarProducto};