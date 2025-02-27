const pool = require('./connection');

const queries = {
  // Perfis
  async createPerfil(perfil) {
    const [result] = await pool.execute(
      'INSERT INTO perfis (nome, orixa, nascimento, batizado, imagem) VALUES (?, ?, ?, ?, ?)',
      [perfil.nome, perfil.orixa, perfil.nascimento, perfil.batizado, perfil.imagem]
    );
    return result;
  },

  async getAllPerfis() {
    const [rows] = await pool.execute('SELECT * FROM perfis');
    return rows;
  },

  // Frentes
  async createFrente(frente) {
    const [result] = await pool.execute(
      'INSERT INTO frentes (titulo, descricao, imagem) VALUES (?, ?, ?)',
      [frente.titulo, frente.descricao, frente.imagem]
    );
    return result;
  },

  // Ervas
  async createErva(erva) {
    const [result] = await pool.execute(
      'INSERT INTO ervas (titulo, subtitulo, texto, imagem) VALUES (?, ?, ?, ?)',
      [erva.titulo, erva.subtitulo, erva.texto, erva.imagem]
    );
    return result;
  },

  // Banhos
  async createBanho(banho, ervas) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [banhoResult] = await connection.execute(
        'INSERT INTO banhos (titulo, subtitulo, imagem) VALUES (?, ?, ?)',
        [banho.titulo, banho.subtitulo, banho.imagem]
      );

      const banhoId = banhoResult.insertId;

      for (const ervaId of ervas) {
        await connection.execute(
          'INSERT INTO banhos_ervas (banho_id, erva_id) VALUES (?, ?)',
          [banhoId, ervaId]
        );
      }

      await connection.commit();
      return banhoResult;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = queries; 