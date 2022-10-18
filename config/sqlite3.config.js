const msgTableName = 'messages';

const sqliteConfig = {
    client: 'sqlite3', 
    connection: {
      filename: "./db/ecommerce.sqlite"
    },
    useNullAsDefault: true
  };  

module.exports = {
    msgTableName,
    sqliteConfig
}
 
