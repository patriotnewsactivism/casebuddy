-- Database schema updates for timeline prediction feature

-- Add timeline predictions table
CREATE TABLE timelinePredictions (
    id TEXT PRIMARY KEY,
    caseId TEXT NOT NULL,
    events TEXT NOT NULL, -- JSON array stored as text
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caseId) REFERENCES cases(id)
);

-- Add predictedAt column to timelineEvents table (optional - to distinguish actual vs predicted events)
-- ALTER TABLE timelineEvents ADD COLUMN predictedAt DATETIME;