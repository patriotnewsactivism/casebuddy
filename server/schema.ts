import { pgTable, uuid, text, timestamp, jsonb, varchar, integer } from 'drizzle-orm/pg-core';

// Mock schema tables for compilation purposes
export const cases = pgTable('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull(),
  name: text('name'),
  content: text('content'),
  mimeType: text('mime_type'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const evidence = pgTable('evidence', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull(),
  name: text('name'),
  description: text('description'),
  fileType: text('file_type'),
  createdAt: timestamp('created_at').defaultNow(),
});