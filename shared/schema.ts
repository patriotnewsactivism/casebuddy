// Document Analysis
import { pgTable, uuid, text, timestamp, jsonb, varchar, integer } from 'drizzle-orm/pg-core';
import { cases, documents, evidence } from '../server/schema';
import { vector } from 'drizzle-orm/pg-core';

// Document Analyses table
export const documentAnalyses = pgTable('document_analyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  documentId: uuid('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  summary: text('summary'),
  entities: jsonb('entities'),
  dates: jsonb('dates'),
  legalIssues: jsonb('legal_issues'),
  risks: jsonb('risks'),
  rawAnalysis: text('raw_analysis'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Case Embeddings table
export const caseEmbeddings = pgTable('case_embeddings', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id, { onDelete: 'cascade' }),
  embedding: vector('embedding', { dimensions: 1536 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Evidence Classifications table
export const evidenceClassifications = pgTable('evidence_classifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  evidenceId: uuid('evidence_id').notNull().references(() => evidence.id, { onDelete: 'cascade' }),
  evidenceType: varchar('evidence_type', { length: 50 }),
  relevanceScore: integer('relevance_score'),
  tags: jsonb('tags'),
  sensitivity: varchar('sensitivity', { length: 50 }),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Timeline Analyses table
export const timelineAnalyses = pgTable('timeline_analyses', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id, { onDelete: 'cascade' }),
  insights: jsonb('insights'),
  gaps: jsonb('gaps'),
  criticalPeriods: jsonb('critical_periods'),
  suggestions: jsonb('suggestions'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// FOIA Templates table
export const foiaTemplates = pgTable('foia_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 100 }).notNull(),
  subjectTemplate: text('subject_template'),
  bodyTemplate: text('body_template'),
  suggestedAttachments: jsonb('suggested_attachments'),
  recommendedAgencies: jsonb('recommended_agencies'),
  tips: jsonb('tips'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Research Queries table
export const researchQueries = pgTable('research_queries', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id, { onDelete: 'cascade' }),
  issue: text('issue'),
  queries: jsonb('queries'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Research Summaries table
export const researchSummaries = pgTable('research_summaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  queryId: uuid('query_id').notNull().references(() => researchQueries.id, { onDelete: 'cascade' }),
  summary: text('summary'),
  precedents: jsonb('precedents'),
  statutes: jsonb('statutes'),
  principles: jsonb('principles'),
  application: text('application'),
  createdAt: timestamp('created_at').defaultNow(),
});