// const container = require('../db/container.js');
// const filename = 'products.json';
// const contenedor = new container(filename);
const express = require('express');
const {ApiProductoMock} = require('../test/ApiProductosMock');
const { Products, requiredFields } = require('../controller/products.controller.js');
const { productsTableName, mariadbConfig } = require('../config/mariadb.config.js');
const dbProducts = new ApiProductoMock(mariadbConfig, productsTableName);
// const ApiProducto = new ApiProductoMock(mariadbConfig, productsTableName);



const getAllProducts = async (req, res) => {
    try {
        const { wasError, data:products } = await dbProducts.getAll();
        if (wasError){
        return res.render("products", 
            {
                products,
                haveProducts: false
            });
        }
        return res.render("products",
            {
                products,
                haveProducts: products.length > 0
            });
    } catch {
        res.send(
            "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde."
        );
    }
}


const addProduct = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        await dbProducts.save({ title, price, thumbnail });
        return res.redirect("/");
    } catch (e) {
        return res
        .status(404)
        .send({
            error: true,
            msg: "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.",
        });
    }
}


const getProductRandom = async (req, res) => {
    try {
        const { wasError, data:products } = await dbProducts.getAll();
        const index = Math.round(Math.random() * products.length);
        res.send(products[index]);
    } catch {
        res.send(
        "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde."
        );
    }
}

const postProductTest = async (req, res, next) => {
    try{
        res.json(ApiProducto.popular(req.query.cant));
    } catch (e){
        next(e);
    }
}


const getProductById = async (req, res) => {
    const { id } = req.query;
    try {
        const { data } = await dbProducts.getById(parseInt(id));
        return res.send(data);
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
}


const editById = async (req, res) => {
    const { id } = req.query;
    try {
        const { data:producto } = await dbProducts.editById(parseInt(id), req.body);
        return res.send({ error: false, msg: "Producto Modificado", producto });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
}


const deleteById = async (req, res) => {
    try {
        const { id } = req.query;
        const { data } = await dbProducts.deleteById(parseInt(id));
        return res.send({ error: false, msg: "Producto Eliminado", data });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
}


module.exports = {  getAllProducts,
                    addProduct,
                    getProductById,
                    getProductRandom,
                    postProductTest,
                    editById,
                    deleteById,
                    requiredFields
                }