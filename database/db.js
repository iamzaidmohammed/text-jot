// database/db.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("textjot.db");

// Run migrations
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  await db.execAsync(`
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
}

export default db;
