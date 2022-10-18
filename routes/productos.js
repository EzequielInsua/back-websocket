const router  = require('express').Router();
const { getAllProducts,
        addProduct,
        getProductRandom,
        getProductById,
        editById,
        deleteById,
        requiredFields } = require('../controller/routerProducts.controller.js');


// const requiredFields = [ 'name', 'description', 'code', 'price', 'thumbnail', 'stock' ];

const checkFields = (req, res, next) => {
    requiredFields.forEach(field => {
        if( req.body[field] === undefined) {
            res.send( { 'error': true,
                        'data': `Some fields are missing. Please complete them first. Fieds are ${ requiredFields.join(', ') }` })
        }
    });
    next()
};


router.get("/", getAllProducts);

router.post("/", checkFields, addProduct);

router.get("/productoRandom", getProductRandom);

router.get("/:id", getProductById);

router.put("/:id", editById);

router.delete("/:id", deleteById);

module.exports = { router, requiredFields };
