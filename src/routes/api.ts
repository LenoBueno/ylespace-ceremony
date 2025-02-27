import express from 'express';
import queries from '../database/queries';

const router = express.Router();

// Rota para listar todos os perfis
router.get('/perfis', async (req, res) => {
  try {
    const perfis = await queries.getAllPerfis();
    console.log('Perfis recuperados:', perfis);
    res.json(perfis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
});

// Rota para criar um novo perfil
router.post('/perfis', async (req, res) => {
  try {
    const novoPerfil = await queries.createPerfil(req.body);
    console.log('Perfil criado:', novoPerfil);
    res.status(201).json(novoPerfil);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
});

// Rota para listar ervas
router.get('/ervas', async (req, res) => {
  try {
    const ervas = await queries.getAllErvas();
    res.json(ervas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ervas' });
  }
});

export default router; 