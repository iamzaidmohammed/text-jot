// database/queries.js
import db from "./db";

// --- Folders ---
export async function getFolders() {
  const result = await db.getAllAsync(
    `SELECT f.id, f.name, COUNT(n.id) as count
     FROM folders f
     LEFT JOIN notes n ON f.id = n.folder_id
     GROUP BY f.id
     ORDER BY f.id DESC;`
  );
  return result;
}

export async function addFolder(name) {
  const result = await db.runAsync("INSERT INTO folders (name) VALUES (?);", [
    name,
  ]);
  return result.lastInsertRowId;
}

// --- Notes ---
export async function getNotes(folderId) {
  const result = await db.getAllAsync(
    "SELECT * FROM notes WHERE folder_id = ? ORDER BY date_edited DESC;",
    [folderId]
  );
  return result;
}

export async function addNote(folderId, title, body) {
  const now = new Date().toISOString();
  const result = await db.runAsync(
    `INSERT INTO notes (folder_id, title, body, date_created, date_edited)
     VALUES (?, ?, ?, ?, ?);`,
    [folderId, title, body, now, now]
  );
  return result.lastInsertRowId;
}

export async function updateNote(id, title, body) {
  const now = new Date().toISOString();
  await db.runAsync(
    "UPDATE notes SET title = ?, body = ?, date_edited = ? WHERE id = ?;",
    [title, body, now, id]
  );
}

export async function deleteNote(id) {
  await db.runAsync("DELETE FROM notes WHERE id = ?;", [id]);
}
