const router = require('express').Router();
const container = require('../db/container.js');

const filename = 'productos.txt';
const contenedor = new container(filename);
const { Engine } = require('../config/engine.js');


router.get("/", async (req, res) => {
    try {
        const products = await contenedor.getAll();
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
});

router.post("/", async (req, res) => {
const { title, price, thumbnail } = req.body;
try {
    await contenedor.save({ title, price, thumbnail });
    return res.redirect("/");
} catch (e) {
    return res
    .status(404)
    .send({
        error: true,
        msg: "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.",
    });
}
});

router.get("/productoRandom", async (req, res) => {
try {
    const products = await contenedor.getAll();
    const index = Math.round(Math.random() * products.length);
    res.send(products[index]);
} catch {
    res.send(
    "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde."
    );
}
});

router.get("/:id", async (req, res) => {
const { id } = req.query;
try {
    const data = await contenedor.getById(parseInt(id));
    return res.send(data);
} catch (e) {
    return res.status(404).send({ error: true, msg: "Producto no encontrado" });
}
});

router.put("/:id", async (req, res) => {
const { id } = req.query;
try {
    const producto = await contenedor.editById(parseInt(id), req.body);
    return res.send({ error: false, msg: "Producto Modificado", producto });
} catch (e) {
    return res.status(404).send({ error: true, msg: "Producto no encontrado" });
}
});

router.delete("/:id", async (req, res) => {
try {
    const { id } = req.query;
    const data = await contenedor.deleteById(parseInt(id));
    return res.send({ error: false, msg: "Producto Eliminado", data });
} catch (e) {
    return res.status(404).send({ error: true, msg: "Producto no encontrado" });
}
});

module.exports = router;
  