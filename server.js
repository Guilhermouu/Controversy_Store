import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const port = 3000;
const  cors_server= cors;
const router=express.Router();
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
app.post('/api/carrinho/adicionar', async (req, res) => {
  const { id_produto, tamanho, cor } = req.body;

  if (!id_produto || !tamanho || !cor) {
    return res.status(400).json({ message: 'Dados incompletos.' });
  }

  const db = await initializeDatabase();

  try {
    const produto = await db.get('SELECT * FROM produto WHERE id = ?', [id_produto]);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const itemExistente = await db.get(`
      SELECT * FROM carrinho
      WHERE produto_id = ? AND tamanho = ? AND cor = ?`,
      [id_produto, tamanho, cor]);

    if (itemExistente) {
      await db.run(`UPDATE carrinho SET quantidade = quantidade + 1 WHERE id = ?`, [itemExistente.id]);
    } else {
      await db.run(`
        INSERT INTO carrinho (produto_id, tamanho, cor, quantidade)
        VALUES (?, ?, ?, ?)`,
        [id_produto, tamanho, cor, 1]);
    }

    res.status(200).json({ message: 'Produto adicionado ao carrinho!' });

  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar ao carrinho.' });
  }
});

app.get('/api/carrinho', async (req, res) => {
  const db = await initializeDatabase();

  try {
    const itens = await db.all(`
      SELECT 
        c.id,
        c.id_produto,
        c.tamanho,
        c.cor,
        c.quantidade,
        p.nome,
        p.preco,
        p.foto
      FROM carrinho c
      JOIN produto p ON p.id = c.id_produto
    `);

    res.status(200).json(itens);
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error.message);
    res.status(500).json({ message: 'Erro ao buscar carrinho.' });
  }
});

app.get('/api/carrinho', (req, res) => {
  const query = `
    SELECT carrinho.id, carrinho.quantidade, carrinho.tamanho, carrinho.cor,
           produto.nome, produto.foto, produto.preco
    FROM carrinho
    JOIN produto ON carrinho.id_produto = produto.codigo
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar itens do carrinho:', err.message);
      return res.status(500).json({ erro: 'Erro ao buscar itens do carrinho' });
    }
    res.json(rows);
  });
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});