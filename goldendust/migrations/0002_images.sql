-- Lodge and camp photos uploaded in /admin (already resized to WebP in the browser).
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  data BLOB NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
