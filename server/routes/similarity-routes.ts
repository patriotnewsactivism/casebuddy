import type { Express } from "express";
import { Router } from "express";
import { authenticateUser } from "../auth";
// import { SimilarityService } from "../services/similarity-service";

const router = Router();
// const similarityService = new SimilarityService();

// Get similar cases
router.get("/cases/:id/similar", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 5;
    
    // const similarCases = await similarityService.findSimilarCases(id, limit);
    
    // Mock similar cases data for now
    const similarCases = [
      {
        id: "similar-case-1",
        title: "Similar Case Example 1",
        description: "This is an example of a similar case",
        similarityScore: 0.85
      },
      {
        id: "similar-case-2",
        title: "Similar Case Example 2",
        description: "This is another example of a similar case",
        similarityScore: 0.72
      }
    ];
    
    res.json({ similarCases });
  } catch (error) {
    console.error("Similar cases error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search similar cases by text
router.post("/cases/search-similar", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    const limit = parseInt(req.query.limit as string) || 5;
    
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    
    // const similarCases = await similarityService.findSimilarByText(text, limit);
    
    // Mock similar cases data for now
    const similarCases = [
      {
        id: "text-similar-case-1",
        title: "Text Similar Case Example 1",
        description: "This is an example of a case similar to the provided text",
        similarityScore: 0.91
      },
      {
        id: "text-similar-case-2",
        title: "Text Similar Case Example 2",
        description: "This is another example of a case similar to the provided text",
        similarityScore: 0.78
      }
    ];
    
    res.json({ similarCases });
  } catch (error) {
    console.error("Similar cases by text error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export function setupSimilarityRoutes(app: Express) {
  app.use('/api', router);
}

export default router;