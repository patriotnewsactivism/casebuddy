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
          let results: any[] = [];
          
          if (tableName.includes('users')) {
            results = Array.from(mockDB.users.values());
          } else if (tableName.includes('sessions')) {
            results = Array.from(mockDB.sessions.values());
          } else if (tableName.includes('cases')) {
            results = Array.from(mockDB.cases.values());
          } else if (tableName.includes('documents')) {
            results = Array.from(mockDB.documents.values());
          } else if (tableName.includes('evidence')) {
            results = Array.from(mockDB.evidence.values());
          } else if (tableName.includes('timelineEvents')) {
            results = Array.from(mockDB.timelineEvents.values());
          } else if (tableName.includes('foiaRequests')) {
            results = Array.from(mockDB.foiaRequests.values());
          }
          
          return Promise.resolve(results.slice(0, n));
        },
        returning: () => Promise.resolve([]),
      }),
      innerJoin: (joinTable: any, joinCondition: any) => ({
        where: (condition: any) => ({
          limit: (n: number) => {
            // Mock join results - return objects with both table properties
            const tableName = table.toString();
            const joinTableName = joinTable.toString();
            
            if (tableName.includes('sessions') && joinTableName.includes('users')) {
              // Mock session-user join
              return Promise.resolve([{
                sessions: { id: 'mock-session', userId: 'mock-user', expiresAt: new Date(), createdAt: new Date() },
                users: { id: 'mock-user', username: 'testuser', password: 'hashed', email: 'test@example.com', createdAt: new Date() }
              }]);
            }
            
            return Promise.resolve([]);
          },
        }),
      }),
    }),
  }),
  insert: (table: any) => ({
    values: (data: any) => ({
      returning: () => {
        const newItem = { ...data, id: data.id || uuid(), createdAt: new Date() };
        const tableName = table.toString();
        
        if (tableName.includes('users')) {
          mockDB.users.set(newItem.id, newItem);
        } else if (tableName.includes('sessions')) {
          mockDB.sessions.set(newItem.id, newItem);
        } else if (tableName.includes('cases')) {
          mockDB.cases.set(newItem.id, newItem);
        } else if (tableName.includes('documents')) {
          mockDB.documents.set(newItem.id, newItem);
        } else if (tableName.includes('evidence')) {
          mockDB.evidence.set(newItem.id, newItem);
        } else if (tableName.includes('timelineEvents')) {
          mockDB.timelineEvents.set(newItem.id, newItem);
        } else if (tableName.includes('foiaRequests')) {
          mockDB.foiaRequests.set(newItem.id, newItem);
        }
        
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
