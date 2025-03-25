import express, { Request, Response, RequestHandler } from 'express';
import { supabase } from '../integrations/supabase/client';
import bcrypt from 'bcrypt';
import pool from '../database/connection';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

// Rota para login de usuário
const loginHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const [users] = await pool.execute<any[]>(
      'SELECT * FROM usuarios WHERE email = ? AND status = "ativo"',
      [email]
    );

    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado ou inativo' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (sessionError) {
      console.error('Erro ao criar sessão:', sessionError);
      return res.status(500).json({ error: 'Erro ao criar sessão' });
    }

    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      token: sessionData.session?.access_token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

router.post('/login', loginHandler);

// Rota para registro de usuário
const registerHandler: RequestHandler = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const [existingUsers] = await pool.execute<any[]>(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Este email já está em uso' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO usuarios (nome, email, senha, role, status) VALUES (?, ?, ?, ?, ?)',
      [nome, email, hashedPassword, 'user', 'ativo']
    );

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, is_admin: false } },
    });

    if (authError) {
      console.error('Erro ao criar usuário no Supabase:', authError);
      await pool.execute('DELETE FROM usuarios WHERE email = ?', [email]);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      id: result.insertId,
      email,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

router.post('/register', registerHandler);

export default router;
