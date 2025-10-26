import type { Express } from "express";
import { createServer } from "http";
import { db } from "./db";
import { cases, documents, evidence, timelineEvents, foiaRequests } from "./schema";
import { eq } from "drizzle-orm";

// Import route handlers
import { setupAuthRoutes } from "./auth-routes";
import { setupDocumentRoutes } from "./routes/document-routes";
import { setupEvidenceRoutes } from "./routes/evidence";
import { setupTimelineRoutes } from "./routes/timeline";
import { setupFOIARoutes } from "./routes/foia-routes";
import { setupResearchRoutes } from "./routes/research-routes";
import { setupSimilarityRoutes } from "./routes/similarity-routes";

export function registerRoutes(app: Express) {
  const server = createServer(app);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Auth routes
  setupAuthRoutes(app);

  // Case management routes
  app.get("/api/cases", async (_req, res) => {
    try {
      const allCases = await db.select().from(cases);
      res.json(allCases);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/cases/:id", async (req, res) => {
    try {
      const caseData = await db.select().from(cases).where(eq(cases.id, req.params.id)).limit(1);
      if (caseData.length === 0) {
        return res.status(404).json({ error: "Case not found" });
      }
      res.json(caseData[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/cases", async (req, res) => {
    try {
      const { title, description } = req.body;
      const newCase = await db.insert(cases).values({
        title,
        description,
      }).returning();
      res.status(201).json(newCase[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/cases/:id", async (req, res) => {
    try {
      await db.delete(cases).where(eq(cases.id, req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Document routes
  app.get("/api/cases/:caseId/documents", async (req, res) => {
    try {
      const docs = await db.select().from(documents).where(eq(documents.caseId, req.params.caseId));
      res.json(docs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Evidence routes
  app.get("/api/cases/:caseId/evidence", async (req, res) => {
    try {
      const evidenceItems = await db.select().from(evidence).where(eq(evidence.caseId, req.params.caseId));
      res.json(evidenceItems);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Timeline routes
  app.get("/api/cases/:caseId/timeline", async (req, res) => {
    try {
      const events = await db.select().from(timelineEvents).where(eq(timelineEvents.caseId, req.params.caseId));
      res.json({ events });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // FOIA routes
  app.get("/api/cases/:caseId/foia", async (req, res) => {
    try {
      const requests = await db.select().from(foiaRequests).where(eq(foiaRequests.caseId, req.params.caseId));
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI Feature routes
  setupDocumentRoutes(app);
  setupEvidenceRoutes(app);
  setupTimelineRoutes(app);
  setupFOIARoutes(app);
  setupResearchRoutes(app);
  setupSimilarityRoutes(app);

  return server;
}
