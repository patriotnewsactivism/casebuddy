import type { Express } from 'express';
import { Router } from 'express';
import { TimelinePredictionService } from '../services/timeline-prediction';

const router = Router();

// Predict timeline events endpoint
router.post('/timeline/predict', async (req, res) => {
  try {
    const { caseData } = req.body;
    
    // Validate input
    if (!caseData) {
      return res.status(400).json({ error: 'Missing required field: caseData' });
    }
    
    // Predict timeline events
    const prediction = await TimelinePredictionService.predictTimelineEvents(caseData);
    
    res.json({ prediction });
  } catch (error) {
    console.error('Timeline prediction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get timeline prediction for a case endpoint
router.get('/cases/:id/timeline/prediction', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, we would retrieve case data from the database
    // For now, we'll return a mock response
    const mockCaseData = {
      id: id,
      title: "Sample Case",
      description: "This is a sample case for testing timeline predictions",
      timelineEvents: []
    };
    
    // Predict timeline events
    const prediction = await TimelinePredictionService.predictTimelineEvents(mockCaseData);
    
    res.json({ prediction });
  } catch (error) {
    console.error('Timeline prediction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export function setupTimelineRoutes(app: Express) {
  app.use('/api', router);
}

export default router;