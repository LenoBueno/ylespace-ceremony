const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

// Teste de conexão
pool.getConnection()
  .then(connection => {
    console.log('Conectado ao MySQL com sucesso!');
    connection.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao MySQL:', err);
  });

module.exports = pool; 