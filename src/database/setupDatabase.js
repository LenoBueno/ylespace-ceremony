const fs = require('fs').promises;
const path = require('path');
const pool = require('./connection');

async function setupDatabase() {
  try {
    const schema = await fs.readFile(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );

    const statements = schema
      .split(';')
      .filter(statement => statement.trim());

    for (const statement of statements) {
      await pool.execute(statement);
    }

    console.log('Banco de dados configurado com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase(); 