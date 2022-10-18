const productsTableName = 'products';

const mariadbConfig = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      // password : '',
      database : 'codereze'
    }
  };

  module.exports = {
    productsTableName,
    mariadbConfig
}