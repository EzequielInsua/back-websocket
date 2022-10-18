const knex = require("knex");


class Messages {

    constructor( config, tableName ){

        this.tableName = tableName;
        this.Knex = knex(config); 
        this.Knex.schema.hasTable(tableName).then((exists) => {
            if (!exists) {
                return this.Knex.schema.createTable(tableName, table => {
                    table.increments('id').primary();
                    table.string('email');
                    table.string('msg');
                    table.timestamp('created_at').defaultTo(knex.fn.now());
                    })
                    .then( () => { console.log(`Tabla ${config.client} creada con exito.`) } )
                    .catch( (err) => { console.log("Error: " + err) } )
                    .finally(() => { this.Knex.destroy() });
            }
        });
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


    insert = async ( {email, msg} ) => {
        let wasError = false;
        let data = '';
        try {
            const newId = await this.Knex(this.tableName).insert([{email, msg}]);
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

}

module.exports = Messages;