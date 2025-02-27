import pool from './connection';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com MySQL estabelecida com sucesso!');
    
    const [result] = await connection.query('SHOW TABLES');
    console.log('Tabelas no banco:', result);
    
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar com MySQL:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 