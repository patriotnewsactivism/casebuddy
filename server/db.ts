// Temporary in-memory mock database for development
// This allows the server to start and test the API structure

import { randomUUID } from 'crypto';

// Mock database with in-memory storage
const mockDB = {
  users: new Map(),
  sessions: new Map(),
  cases: new Map(),
  documents: new Map(),
  evidence: new Map(),
  timelineEvents: new Map(),
  foiaRequests: new Map(),
};

// Helper to generate UUID
const uuid = () => randomUUID();

// Mock drizzle-orm interface
export const db = {
  select: () => ({
    from: (table: any) => ({
      where: (condition: any) => ({
        limit: (n: number) => {
          const tableName = table.toString();
          return Promise.resolve([]);
        },
        returning: () => Promise.resolve([]),
      }),
      innerJoin: () => ({
        where: () => ({
          limit: () => Promise.resolve([]),
        }),
      }),
    }),
  }),
  insert: (table: any) => ({
    values: (data: any) => ({
      returning: () => {
        const newItem = { ...data, id: data.id || uuid(), createdAt: new Date() };
        const tableName = table.toString();
        if (tableName.includes('users')) mockDB.users.set(newItem.id, newItem);
        else if (tableName.includes('sessions')) mockDB.sessions.set(newItem.id, newItem);
        else if (tableName.includes('cases')) mockDB.cases.set(newItem.id, newItem);
        return Promise.resolve([newItem]);
      },
    }),
  }),
  update: (table: any) => ({
    set: (data: any) => ({
      where: (condition: any) => Promise.resolve(),
    }),
  }),
  delete: (table: any) => ({
    where: (condition: any) => Promise.resolve(),
  }),
};

console.log('Using in-memory mock database for development');
