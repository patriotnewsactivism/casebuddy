-- Database schema updates for legal research feature

-- Add legal research table
CREATE TABLE legalResearch (
    id TEXT PRIMARY KEY,
    caseId TEXT NOT NULL,
    researchQuery TEXT NOT NULL,
    researchSummary TEXT NOT NULL,
    relevantCases TEXT NOT NULL, -- JSON array stored as text
    relevantLaws TEXT NOT NULL, -- JSON array stored as text
    researchStrategy TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caseId) REFERENCES cases(id)
);

-- Add legal research queries table (to track research history)
CREATE TABLE legalResearchQueries (
    id TEXT PRIMARY KEY,
    caseId TEXT NOT NULL,
    query TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caseId) REFERENCES cases(id)
);