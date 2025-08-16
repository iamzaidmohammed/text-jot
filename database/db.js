// database/db.js
import * as SQLite from "expo-sqlite";

// Open the database
const db = SQLite.openDatabaseAsync("textjot.db");

// Run migrations
export async function initDB() {
  const database = await db;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      folder_id INTEGER,
      title TEXT,
      body TEXT,
      date_created TEXT,
      date_edited TEXT,
      FOREIGN KEY(folder_id) REFERENCES folders(id)
    );
  `);

  return database;
}

export default db;
