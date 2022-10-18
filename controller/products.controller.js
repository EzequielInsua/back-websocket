
const knex = require("knex");

const requiredFields = [ 'title', 'price', 'thumbnail' ];


class Products {

    constructor(config, tableName ){
        this.tableName = tableName;
        this.Knex = knex(config);
        this.Knex.schema.hasTable(tableName).then((exists) => {
            if (!exists) {
                return this.Knex.schema.createTable(tableName, table => {
                    table.increments('id').primary();
                    table.string('title');
                    table.string('thumbnail');
                    table.integer('price');
                    table.timestamp('created_at'); //.defaultTo(knex.fn.now())
                    })
                    .then( () => { console.log(`Tabla ${config.client} creada con exito.`) } )
                    .catch( (err) => { console.log("Error: " + err) } )
                    .finally(() => { this.Knex.destroy() });
            }
        });
    }


    save = async ( {title, thumbnail, price} ) => {
        let wasError = false;
        let data = '';
        try {
            const newId = await this.Knex(this.tableName).insert({title, thumbnail, price});
            data = await this.Knex(this.tableName).where('id', newId)
        }catch (err) {
            console.log(`ERROR: ${err}`)
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy();
            return {wasError, data}
        }
    }



    getById = async(id) => {
        let wasError = false;
        let data = '';
        try {
            data = await this.Knex(this.tableName).where('id', id)
        }catch (err) {
            console.log(`ERROR: ${err}`)
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy();
            return {wasError, data}
        }
    }

    getAll = async() => {
        let data = '';
        let wasError = false;
        try {
            data = await this.Knex(this.tableName);
        }catch (err) {
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy(); 
            return {wasError, data}
        }      
    }


    deleteById = async(id) => {
        let wasError = false;
        let data = '';
        try {
            data = await this.Knex(this.tableName).where('id', id).del()
        }catch (err) {
            console.log(`ERROR: ${err}`)
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy();
            return {wasError, data}
        }
    }
    

    deleteAll = async() => {
        let wasError = false;
        let data = '';
        try {
            data = await this.Knex(this.tableName).del()
        }catch (err) {
            console.log(`ERROR: ${err}`)
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy();
            return {wasError, data}
        }
    }

    
    editById = async(id, newObj ) => {
        let wasError = false;
        let data = '';
        const newValues = {};
        requiredFields.keys().forEach ( k => {
            if (k in newObj.keys()){
                newValues[ k ] = newObj[ k ];
            }
        } )
        try {
            const rta = await this.Knex(this.tableName).where('id', id).update(newValues);
            data = await this.Knex(this.tableName).where('id', id);
        }catch (err) {
            console.log(`ERROR: ${err}`)
            data = err;
            wasError = true;
        }finally {
            /* si lo habilito me da error: "Error: Unable to acquire a connection" */
            // this.Knex.destroy();
            return {wasError, data}
        }
    }


}


module.exports = { Products, requiredFields }