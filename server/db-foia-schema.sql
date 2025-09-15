-- Database schema updates for FOIA optimization feature

-- Add FOIA requests table
CREATE TABLE foiaRequests (
    id TEXT PRIMARY KEY,
    caseId TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    requestedDocuments TEXT NOT NULL, -- JSON array stored as text
    relevantLaws TEXT NOT NULL, -- JSON array stored as text
    optimizedRequest TEXT, -- Store the optimized request language
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caseId) REFERENCES cases(id)
);

-- Add FOIA optimizations table
CREATE TABLE foiaOptimizations (
    id TEXT PRIMARY KEY,
    foiaRequestId TEXT NOT NULL,
    optimizedRequest TEXT NOT NULL,
    explanation TEXT NOT NULL,
    keyImprovements TEXT NOT NULL, -- JSON array stored as text
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (foiaRequestId) REFERENCES foiaRequests(id)
);