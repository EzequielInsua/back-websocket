const express = require('express');
const handlebars = require('express-handlebars');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const routerProducts = require('./routes/productos');
const eng = require('./config/engine');
const container = require('./db/container.js');



const filename = 'productos.txt';
const contenedor = new container(filename);
const PORT = 8081;
const ENGINE = eng.Engine;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const Mensajes = [
    { autor: "Jose", msj: "hola mundo!" },
    { autor: "maria", msj: "hola coder!" },
    { autor: "pedro", msj: "hola todos!" },
];

app.use('/productos', routerProducts);

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.get('/', (req, res) => {
    return res.render("index");
});


app.engine(
    ENGINE,
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }),
)
app.set("views", "./views");
app.use(express.static("public"));



app.set("view engine", ENGINE);

// const server = app.listen(PORT, ()=>{
const server = httpServer.listen( PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});

server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );

io.on('connection', async ( socket ) => {
    const products = await contenedor.getAll();
    socket.emit('products', products);
    socket.emit("mensajes", Mensajes);


    socket.on("new_msg", (data) => {
        // console.log(data);
        Mensajes.push(data);
        // socket.to().emit('evento', 'data')
        io.sockets.emit("mensajes", Mensajes);
    });

    socket.on('new_product', async ( newProduct ) => {
        // console.log(newProduct)
        await contenedor.save(newProduct);
        const products = await contenedor.getAll();
        io.sockets.emit('products', products);
    })
})



