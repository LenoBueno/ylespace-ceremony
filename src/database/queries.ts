import { Pool, RowDataPacket } from 'mysql2/promise';
import pool from './connection';

interface Perfil {
  id?: number;
  nome: string;
  orixa: string;
  nascimento: Date;
  batizado: Date;
  imagem?: string;
  status?: 'ativo' | 'inativo';
}

interface Frente {
  id?: number;
  titulo: string;
  descricao: string;
  imagem?: string;
  ordem_exibicao: number;
  status?: 'ativo' | 'inativo';
}

interface CategoriaErva {
  id?: number;
  nome: string;
  descricao?: string;
  status?: 'ativo' | 'inativo';
}

interface Erva {
  id?: number;
  titulo: string;
  subtitulo: string;
  texto: string;
  imagem?: string;
  categoria_id?: number;
  status?: 'ativo' | 'inativo';
}

interface Banho {
  id?: number;
  titulo: string;
  subtitulo: string;
  descricao?: string;
  modo_preparo?: string;
  imagem?: string;
  status?: 'ativo' | 'inativo';
}

interface BanhoErva {
  banho_id: number;
  erva_id: number;
  quantidade?: string;
  modo_uso?: string;
}

const queries = {
  // Perfis
  async createPerfil(perfil: Perfil) {
    const [result] = await pool.execute(
      'INSERT INTO perfis (nome, orixa, nascimento, batizado, imagem, status) VALUES (?, ?, ?, ?, ?, ?)',
      [perfil.nome, perfil.orixa, perfil.nascimento, perfil.batizado, perfil.imagem, perfil.status || 'ativo']
    );
    return result;
  },

  async getAllPerfis(apenasAtivos = true) {
    const query = apenasAtivos 
      ? 'SELECT * FROM perfis WHERE status = "ativo"'
      : 'SELECT * FROM perfis';
    const [rows] = await pool.execute(query);
    return rows;
  },

  // Categorias de Ervas
  async createCategoriaErva(categoria: CategoriaErva) {
    const [result] = await pool.execute(
      'INSERT INTO categorias_ervas (nome, descricao, status) VALUES (?, ?, ?)',
      [categoria.nome, categoria.descricao, categoria.status || 'ativo']
    );
    return result;
  },

  async getAllCategoriasErvas() {
    const [rows] = await pool.execute('SELECT * FROM categorias_ervas WHERE status = "ativo"');
    return rows;
  },

  // Ervas
  async createErva(erva: Erva) {
    const [result] = await pool.execute(
      'INSERT INTO ervas (titulo, subtitulo, texto, imagem, categoria_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [erva.titulo, erva.subtitulo, erva.texto, erva.imagem, erva.categoria_id, erva.status || 'ativo']
    );
    return result;
  },

  async getErvasByCategoria(categoriaId: number) {
    const [rows] = await pool.execute(
      'SELECT * FROM ervas WHERE categoria_id = ? AND status = "ativo"',
      [categoriaId]
    );
    return rows;
  },

  // Banhos
  async createBanho(banho: Banho, ervas: BanhoErva[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [banhoResult] = await connection.execute(
        'INSERT INTO banhos (titulo, subtitulo, descricao, modo_preparo, imagem, status) VALUES (?, ?, ?, ?, ?, ?)',
        [banho.titulo, banho.subtitulo, banho.descricao, banho.modo_preparo, banho.imagem, banho.status || 'ativo']
      );

      const banhoId = (banhoResult as any).insertId;

      for (const erva of ervas) {
        await connection.execute(
          'INSERT INTO banhos_ervas (banho_id, erva_id, quantidade, modo_uso) VALUES (?, ?, ?, ?)',
          [banhoId, erva.erva_id, erva.quantidade, erva.modo_uso]
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
  },

  async getBanhoComErvas(banhoId: number) {
    const [banho] = await pool.execute(
      'SELECT * FROM banhos WHERE id = ? AND status = "ativo"',
      [banhoId]
    );
    
    const [ervas] = await pool.execute(`
      SELECT e.*, be.quantidade, be.modo_uso 
      FROM ervas e 
      JOIN banhos_ervas be ON e.id = be.erva_id 
      WHERE be.banho_id = ? AND e.status = "ativo"
    `, [banhoId]);

    return { banho: banho[0], ervas };
  }
};

export default queries; 