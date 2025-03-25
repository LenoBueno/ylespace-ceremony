import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Usuario extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: string;
  status: string;
}

export interface UsuarioResult extends ResultSetHeader {
  insertId: number;
}