import {open} from 'sqlite'
import sqlite3 from 'sqlite3'

async function initializeDatabase() {
  const db = await open({
    filename: 'database/controversy.db',
    driver: sqlite3.Database
  });

  return db;
}

const db= await initializeDatabase()

db.run('ALTER TABLE produto DROP COLUMN tecido')

// await db.exec(`
//   CREATE TABLE IF NOT EXISTS carrinho (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     usuario_id INTEGER NOT NULL,
//     produto_id INTEGER NOT NULL,
//     quantidade INTEGER NOT NULL DEFAULT 1,
//     FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
//     FOREIGN KEY (produto_id) REFERENCES produtos(id)
//   )
// `);
