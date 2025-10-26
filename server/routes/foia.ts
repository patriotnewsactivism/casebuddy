import { Router } from 'express';
import { FoiaOptimizationService } from '../services/foia-optimization';

const router = Router();

// Optimize FOIA request endpoint
router.post('/foia/optimize', async (req, res) => {
  try {
    const { requestData } = req.body;
    
    // Validate input
    if (!requestData) {
      return res.status(400).json({ error: 'Missing required field: requestData' });
    }
    
    // Optimize FOIA request
    const optimization = await FoiaOptimizationService.optimizeFOIARequest(requestData);
    
    res.json({ optimization });
  } catch (error) {
    console.error('FOIA optimization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get FOIA optimization for a case endpoint
router.get('/cases/:id/foia/optimization', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, we would retrieve case data from the database
    // For now, we'll return a mock response
    const mockRequestData = {
      id: id,
      subject: "Government Contracts",
      description: "Requesting documents related to government contracts with private vendors",
      requestedDocuments: [
        "All contracts between the agency and private vendors",
        "Correspondence related to the awarding of these contracts",
        "Financial records showing payments made to these vendors"
      ],
      relevantLaws: [
        "Freedom of Information Act (FOIA)",
        "Federal Acquisition Regulation (FAR)"
      ]
    };
    
    // Optimize FOIA request
    const optimization = await FoiaOptimizationService.optimizeFOIARequest(mockRequestData);
    
    res.json({ optimization });
  } catch (error) {
    console.error('FOIA optimization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;