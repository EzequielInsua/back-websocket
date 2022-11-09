const router  = require('express').Router();
const { getAllProducts,
        addProduct,
        getProductRandom,
        postProductTest,
        getProductById,
        editById,
        deleteById,
        requiredFields } = require('./routerProducts.controller.js');


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

router.post("/productos-test", postProductTest);

router.get("/:id", getProductById);

router.put("/:id", editById);

router.delete("/:id", deleteById);

module.exports = { router, requiredFields };
