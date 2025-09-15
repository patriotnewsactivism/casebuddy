# CaseBuddy AI Features User Guide

## Introduction

CaseBuddy now includes powerful AI features to help legal professionals and researchers manage their cases more effectively. This guide provides an overview of each AI feature and instructions on how to use them.

## Table of Contents

1. [AI Document Reviewer](#ai-document-reviewer)
2. [Evidence Classification and Tagging](#evidence-classification-and-tagging)
3. [Timeline Event Prediction](#timeline-event-prediction)
4. [FOIA Request Optimization](#foia-request-optimization)
5. [Legal Research Assistant](#legal-research-assistant)

## AI Document Reviewer

### Overview

The AI Document Reviewer automatically analyzes legal documents and extracts key information, including:
- Document summary
- Key entities (people, organizations, locations)
- Important dates and deadlines
- Legal issues and claims
- Potential risks and concerns

### How to Use

1. **Upload a Document**:
   - Navigate to a case detail page
   - Click the "Upload Document" button
   - Select a document file or paste text content
   - Enter a document name
   - Click "Upload"

2. **View Analysis**:
   - After uploading, the document will appear in the case documents list
   - Click "View Analysis" next to the document
   - The analysis modal will display the AI-generated insights

### Example

When you upload a contract, the AI Document Reviewer might identify:
- Contract parties and their roles
- Key dates such as signing date and termination date
- Potential legal issues in the contract language
- Risks such as ambiguous clauses or missing terms

## Evidence Classification and Tagging

### Overview

The Evidence Classification and Tagging feature automatically identifies the type of evidence and suggests relevant tags, including:
- Evidence type (Document, Email, Contract, Photograph, etc.)
- Relevant tags based on content
- Confidence score for the classification
- Explanation of the classification decision

### How to Use

1. **Classify Evidence**:
   - Navigate to a case detail page
   - Select a document or upload new evidence
   - Click "Classify Evidence"
   - The system will analyze the content and provide classification results

2. **View Classification Results**:
   - The classification modal will display the evidence type, tags, and explanation
   - You can accept the suggested tags or modify them
   - Click "Save Classification" to store the results

### Example

When you classify a legal contract, the system might identify:
- Evidence Type: "Document - Contract"
- Tags: "legal", "agreement", "services", "confidentiality"
- Confidence: 95%
- Explanation: "This document contains standard contract language including parties, terms, conditions, and signatures."

## Timeline Event Prediction

### Overview

The Timeline Event Prediction feature analyzes case information and predicts potential future events, including:
- Event descriptions
- Estimated dates
- Confidence scores
- Explanations for predictions

### How to Use

1. **Generate Timeline Predictions**:
   - Navigate to a case detail page
   - Click on the "Timeline" tab
   - Click "Predict Future Events"
   - The system will analyze case data and generate predictions

2. **View Predictions**:
   - The timeline prediction modal will display predicted events with dates
   - Events are sorted chronologically
   - Each prediction includes a confidence score and explanation
   - You can add predicted events to your case timeline

### Example

For a contract dispute case, the system might predict:
- "Discovery phase begins" (October 1, 2025, 85% confidence)
- "Depositions scheduled" (November 15, 2025, 75% confidence)
- "Motion for summary judgment filed" (January 30, 2026, 60% confidence)

## FOIA Request Optimization

### Overview

The FOIA Request Optimization feature helps improve Freedom of Information Act requests to increase the chances of receiving the desired documents, including:
- Optimized request language
- Explanation of optimizations made
- Key improvements list

### How to Use

1. **Optimize FOIA Request**:
   - Navigate to a case detail page
   - Click on the "FOIA Requests" tab
   - Enter your draft FOIA request
   - Click "Optimize Request"

2. **View Optimized Request**:
   - The optimization modal will display the improved request language
   - Review the explanation of optimizations made
   - Review the list of key improvements
   - Click "Use Optimized Request" to update your draft

### Example

Original request: "I want all documents about government contracts with private vendors."

Optimized request:
```
I request the following documents under the Freedom of Information Act:

1. All contracts between the agency and private vendors from January 1, 2020, to December 31, 2024.
2. Correspondence related to the awarding of these contracts.
3. Financial records showing payments made to these vendors.

I am a journalist investigating government spending practices and these documents are essential for my reporting.
```

## Legal Research Assistant

### Overview

The Legal Research Assistant helps conduct legal research by identifying relevant cases and laws, including:
- Research summary
- Relevant cases with citations
- Relevant laws with citations
- Recommended research strategy

### How to Use

1. **Conduct Legal Research**:
   - Navigate to a case detail page
   - Click on the "Legal Research" tab
   - Enter your research query
   - Click "Conduct Research"

2. **View Research Results**:
   - The research modal will display the research summary
   - Review relevant cases with citations and explanations
   - Review relevant laws with citations and explanations
   - Review the recommended research strategy
   - Click "Save Research" to store the results

### Example

For a research query about "contract disputes", the system might return:
- Relevant cases like "Smith v. Example Corp." with citations and relevance explanations
- Relevant laws like "Uniform Commercial Code (UCC) Article 2" with explanations
- A research strategy recommending specific legal databases to search

## Technical Notes

- All AI features use the Anthropic Claude API for analysis
- Features will work in offline mode with mock data if API keys are not available
- Results are stored in the database for future reference
- Authentication is required to access these features in production