-- Database schema updates for evidence classification feature

-- Add evidence classification table
CREATE TABLE evidenceClassifications (
    id TEXT PRIMARY KEY,
    documentId TEXT NOT NULL,
    evidenceType TEXT NOT NULL,
    tags TEXT NOT NULL, -- JSON array stored as text
    confidence INTEGER NOT NULL, -- 0-100
    explanation TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (documentId) REFERENCES documents(id)
);

-- Add tags column to documents table (optional - could store suggested tags directly on documents)
-- ALTER TABLE documents ADD COLUMN tags TEXT; -- JSON array stored as text