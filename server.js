import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const port = 3000;
const  cors_server= cors;

app.use(cors_server({
  origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());

// // Inicialização do banco de dados
async function initializeDatabase() {
  const db = await open({
    filename: 'controversy.db',
    driver: sqlite3.Database
  });

  return db;
}

// Rota de login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const db = await initializeDatabase();

  const usuario = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);

  if (!usuario) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (senhaCorreta) {
    res.status(200).json({ message: "Login bem-sucedido", nome: usuario.nome });
  } else {
    res.status(401).json({ message: "Senha incorreta" });
  }
});

app.post('/api/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const db = await initializeDatabase();

    // Verifica se o e-mail já está cadastrado
    const existingUser = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'E-mail já está cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere o usuário no banco
    await db.run('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
  }
});
app.post('/api/carrinho', async (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;

  if (!usuario_id || !produto_id || !quantidade) {
    return res.status(400).json({ success: false, message: 'Dados incompletos.' });
  }

  try {
    const db = await initializeDatabase();

    // Verifica se o produto já está no carrinho do usuário
    const itemExistente = await db.get(
      'SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?',
      [usuario_id, produto_id]
    );

    if (itemExistente) {
      // Atualiza a quantidade
      await db.run(
        'UPDATE carrinho SET quantidade = quantidade + ? WHERE usuario_id = ? AND produto_id = ?',
        [quantidade, usuario_id, produto_id]
      );
    } else {
      // Insere um novo item
      await db.run(
        'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)',
        [usuario_id, produto_id, quantidade]
      );
    }

    res.status(200).json({ success: true, message: 'Produto adicionado ao carrinho.' });
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error.message);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});