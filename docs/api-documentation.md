# CaseBuddy API Documentation

## Overview

This document provides detailed information about the CaseBuddy API endpoints, focusing on the AI features. The API allows you to interact with CaseBuddy's AI capabilities programmatically.

## Base URL

All API endpoints are relative to the base URL:

```
/api
```

## Authentication

Authentication is required for all API endpoints. Use the following header:

```
Authorization: Bearer YOUR_TOKEN
```

Note: Authentication is temporarily disabled for testing purposes but will be re-enabled in production.

## API Endpoints

### Document Analysis

#### Upload Document

Uploads a document and triggers AI analysis.

- **URL**: `/documents`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "caseId": "string",
    "name": "string",
    "content": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Document uploaded successfully",
    "document": {
      "id": "string",
      "caseId": "string",
      "name": "string",
      "createdAt": "string"
    }
  }
  ```
- **Status Codes**:
  - `201`: Document created successfully
  - `400`: Missing required fields
  - `500`: Internal server error

#### Get Document Analysis

Retrieves the AI analysis for a specific document.

- **URL**: `/documents/:id/analysis`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Document ID
- **Response**:
  ```json
  {
    "analysis": {
      "id": "string",
      "documentId": "string",
      "summary": "string",
      "entities": {
        "people": ["string"],
        "organizations": ["string"],
        "locations": ["string"]
      },
      "dates": ["string"],
      "legalIssues": ["string"],
      "risks": ["string"],
      "rawAnalysis": "string",
      "createdAt": "string"
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `404`: Analysis not found
  - `500`: Internal server error

### Evidence Classification

#### Classify Evidence

Classifies evidence and suggests relevant tags.

- **URL**: `/evidence/classify`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "content": "string"
  }
  ```
- **Response**:
  ```json
  {
    "classification": {
      "evidenceType": "string",
      "tags": ["string"],
      "confidence": 95,
      "explanation": "string"
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `400`: Missing required fields
  - `500`: Internal server error

### Timeline Prediction

#### Predict Timeline Events

Predicts future timeline events based on case data.

- **URL**: `/timeline/predict`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "caseData": {
      "title": "string",
      "description": "string",
      "documents": [
        {
          "name": "string",
          "content": "string"
        }
      ],
      "timelineEvents": [
        {
          "date": "string",
          "description": "string"
        }
      ]
    }
  }
  ```
- **Response**:
  ```json
  {
    "prediction": {
      "events": [
        {
          "event": "string",
          "date": "string",
          "confidence": 85,
          "explanation": "string"
        }
      ]
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `400`: Missing required fields
  - `500`: Internal server error

#### Get Timeline Prediction for Case

Retrieves timeline predictions for a specific case.

- **URL**: `/cases/:id/timeline/prediction`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Case ID
- **Response**:
  ```json
  {
    "prediction": {
      "events": [
        {
          "event": "string",
          "date": "string",
          "confidence": 85,
          "explanation": "string"
        }
      ]
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `404`: Case not found
  - `500`: Internal server error

### FOIA Request Optimization

#### Optimize FOIA Request

Optimizes a FOIA request to improve chances of receiving documents.

- **URL**: `/foia/optimize`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "requestData": {
      "subject": "string",
      "description": "string",
      "requestedDocuments": ["string"],
      "relevantLaws": ["string"]
    }
  }
  ```
- **Response**:
  ```json
  {
    "optimization": {
      "optimizedRequest": "string",
      "explanation": "string",
      "keyImprovements": ["string"]
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `400`: Missing required fields
  - `500`: Internal server error

#### Get FOIA Optimization for Case

Retrieves FOIA optimization for a specific case.

- **URL**: `/cases/:id/foia/optimization`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Case ID
- **Response**:
  ```json
  {
    "optimization": {
      "optimizedRequest": "string",
      "explanation": "string",
      "keyImprovements": ["string"]
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `404`: Case not found
  - `500`: Internal server error

### Legal Research

#### Conduct Legal Research

Conducts legal research based on a query and case data.

- **URL**: `/research/conduct`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "researchQuery": "string",
    "caseData": {
      "title": "string",
      "description": "string",
      "documents": [
        {
          "name": "string",
          "content": "string"
        }
      ],
      "legalResearch": [
        {
          "topic": "string",
          "findings": "string"
        }
      ]
    }
  }
  ```
- **Response**:
  ```json
  {
    "research": {
      "researchSummary": "string",
      "relevantCases": [
        {
          "caseName": "string",
          "citation": "string",
          "summary": "string",
          "relevance": "string"
        }
      ],
      "relevantLaws": [
        {
          "lawName": "string",
          "citation": "string",
          "summary": "string",
          "relevance": "string"
        }
      ],
      "researchStrategy": "string"
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `400`: Missing required fields
  - `500`: Internal server error

#### Get Legal Research for Case

Retrieves legal research for a specific case.

- **URL**: `/cases/:id/research`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Case ID
- **Response**:
  ```json
  {
    "research": {
      "researchSummary": "string",
      "relevantCases": [
        {
          "caseName": "string",
          "citation": "string",
          "summary": "string",
          "relevance": "string"
        }
      ],
      "relevantLaws": [
        {
          "lawName": "string",
          "citation": "string",
          "summary": "string",
          "relevance": "string"
        }
      ],
      "researchStrategy": "string"
    }
  }
  ```
- **Status Codes**:
  - `200`: Success
  - `404`: Case not found
  - `500`: Internal server error

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message"
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per user. Exceeding this limit will result in a `429 Too Many Requests` response.

## Versioning

The current API version is v1. All endpoints are prefixed with `/api`.

## Development Notes

- The API is currently in development mode with authentication disabled
- Mock data is used when Anthropic API keys are not available
- For production use, ensure proper authentication is configured