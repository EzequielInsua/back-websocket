const express = require('express');
const handlebars = require('express-handlebars');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const { router: routerProducts } = require('./routes/productos');
const { Products } = require('./controller/products.controller.js');
const { productsTableName, mariadbConfig } = require('./config/mariadb.config.js');
const { msgTableName, sqliteConfig } = require('./config/sqlite3.config.js');
const Messages = require('./controller/messages.controller');


const dbProducts = new Products( mariadbConfig, productsTableName );
const PORT = 8090;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



const dbMsg = new Messages( sqliteConfig, msgTableName );

app.use('/productos', routerProducts);

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.get('/', (req, res) => {
    return res.render("index");
    
});


app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }),
)
app.set("views", "./views");
app.use(express.static("public"));


app.set("view engine", "hbs");

const server = httpServer.listen( PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});

server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );

io.on('connection', async ( socket ) => {
    const products = await dbProducts.getAll();
    const { wasError, data } = await dbMsg.getAll();
    socket.emit('products', products);
    !wasError && socket.emit("mensajes", data);


    socket.on("new_msg", async (data) => {
        const {email, msg} = data;
        const { wasError, data:newMsg} = await dbMsg.insert( {email, msg});
        if (!wasError){
            const { wasError:Error, data } = await dbMsg.getAll();
            !Error && io.sockets.emit("mensajes", data);
        }
        // socket.to().emit('evento', 'data')
      });

      socket.on('new_product', async ( newProduct ) => {
        await dbProducts.save(newProduct);
        const products = await dbProducts.getAll();
        io.sockets.emit('products', products);
    })
})
