import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './database/supabase.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/ping', (req, res) => {
  res.json({ message: 'API backend rodando!' });
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return res.status(401).json({ message: error.message });
  }
  res.json({ user: data.user });
});

// Rota de cadastro
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  res.json({ user: data.user });
});

// Rota para buscar perfil do usuário
app.get('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  if (error) {
    return res.status(404).json({ message: error.message });
  }
  res.json({ profile: data });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
}); 