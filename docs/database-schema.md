# CaseBuddy Database Schema Documentation

## Overview

This document provides detailed information about the CaseBuddy database schema, focusing on the tables related to AI features. The schema is designed to store case information, documents, and AI-generated analysis results.

## Database Tables

### Core Tables

#### users
Stores user information.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| email | TEXT | User email address |
| name | TEXT | User name |
| createdAt | DATETIME | Record creation timestamp |

#### cases
Stores case information.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| userId | TEXT | Foreign key to users.id |
| title | TEXT | Case title |
| description | TEXT | Case description |
| status | TEXT | Case status |
| createdAt | DATETIME | Record creation timestamp |
| updatedAt | DATETIME | Record update timestamp |

#### documents
Stores document information.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| name | TEXT | Document name |
| content | TEXT | Document content |
| mimeType | TEXT | Document MIME type |
| size | INTEGER | Document size in bytes |
| createdAt | DATETIME | Record creation timestamp |

### AI Document Analysis Tables

#### documentAnalyses
Stores AI-generated document analysis results.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| documentId | TEXT | Foreign key to documents.id |
| summary | TEXT | Document summary |
| entities | TEXT | JSON array of entities (people, organizations, locations) |
| dates | TEXT | JSON array of important dates |
| legalIssues | TEXT | JSON array of legal issues |
| risks | TEXT | JSON array of potential risks |
| rawAnalysis | TEXT | Raw analysis text |
| createdAt | DATETIME | Record creation timestamp |

### Evidence Classification Tables

#### evidenceClassifications
Stores AI-generated evidence classification results.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| documentId | TEXT | Foreign key to documents.id |
| evidenceType | TEXT | Type of evidence |
| tags | TEXT | JSON array of tags |
| confidence | INTEGER | Confidence score (0-100) |
| explanation | TEXT | Explanation of classification |
| createdAt | DATETIME | Record creation timestamp |

### Timeline Prediction Tables

#### timelineEvents
Stores timeline events.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| date | TEXT | Event date |
| description | TEXT | Event description |
| createdAt | DATETIME | Record creation timestamp |
| predictedAt | DATETIME | When the event was predicted (null for actual events) |

#### timelinePredictions
Stores AI-generated timeline predictions.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| events | TEXT | JSON array of predicted events |
| createdAt | DATETIME | Record creation timestamp |

### FOIA Request Tables

#### foiaRequests
Stores FOIA request information.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| subject | TEXT | Request subject |
| description | TEXT | Request description |
| requestedDocuments | TEXT | JSON array of requested documents |
| relevantLaws | TEXT | JSON array of relevant laws |
| optimizedRequest | TEXT | Optimized request language |
| createdAt | DATETIME | Record creation timestamp |

#### foiaOptimizations
Stores AI-generated FOIA request optimizations.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| foiaRequestId | TEXT | Foreign key to foiaRequests.id |
| optimizedRequest | TEXT | Optimized request language |
| explanation | TEXT | Explanation of optimizations |
| keyImprovements | TEXT | JSON array of key improvements |
| createdAt | DATETIME | Record creation timestamp |

### Legal Research Tables

#### legalResearch
Stores AI-generated legal research results.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| researchQuery | TEXT | Research query |
| researchSummary | TEXT | Research summary |
| relevantCases | TEXT | JSON array of relevant cases |
| relevantLaws | TEXT | JSON array of relevant laws |
| researchStrategy | TEXT | Recommended research strategy |
| createdAt | DATETIME | Record creation timestamp |

#### legalResearchQueries
Stores legal research queries.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key |
| caseId | TEXT | Foreign key to cases.id |
| query | TEXT | Research query |
| createdAt | DATETIME | Record creation timestamp |

## Relationships

### One-to-Many Relationships

- A user can have many cases
- A case can have many documents
- A case can have many timeline events
- A case can have many FOIA requests
- A case can have many legal research queries

### One-to-One Relationships

- A document can have one document analysis
- A document can have one evidence classification
- A FOIA request can have one optimization

## JSON Data Structures

### documentAnalyses.entities
```json
{
  "people": ["string"],
  "organizations": ["string"],
  "locations": ["string"]
}
```

### timelinePredictions.events
```json
[
  {
    "event": "string",
    "date": "string",
    "confidence": 85,
    "explanation": "string"
  }
]
```

### foiaOptimizations.keyImprovements
```json
[
  "string"
]
```

### legalResearch.relevantCases
```json
[
  {
    "caseName": "string",
    "citation": "string",
    "summary": "string",
    "relevance": "string"
  }
]
```

### legalResearch.relevantLaws
```json
[
  {
    "lawName": "string",
    "citation": "string",
    "summary": "string",
    "relevance": "string"
  }
]
```

## Development Notes

- The current implementation uses SQLite for development
- For production, PostgreSQL is recommended
- When migrating to PostgreSQL, update the data types accordingly:
  - TEXT → TEXT or VARCHAR
  - INTEGER → INTEGER
  - DATETIME → TIMESTAMP
- JSON data is stored as TEXT in SQLite but can use JSONB in PostgreSQL for better performance