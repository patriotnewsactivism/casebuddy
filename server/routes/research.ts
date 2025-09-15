import { Router } from 'express';
import { LegalResearchService } from '../services/legal-research';

const router = Router();

// Conduct legal research endpoint
router.post('/research/conduct', async (req, res) => {
  try {
    const { researchQuery, caseData } = req.body;
    
    // Validate input
    if (!researchQuery) {
      return res.status(400).json({ error: 'Missing required field: researchQuery' });
    }
    
    if (!caseData) {
      return res.status(400).json({ error: 'Missing required field: caseData' });
    }
    
    // Conduct legal research
    const research = await LegalResearchService.conductLegalResearch(researchQuery, caseData);
    
    res.json({ research });
  } catch (error) {
    console.error('Legal research error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get legal research for a case endpoint
router.get('/cases/:id/research', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, we would retrieve case data from the database
    // For now, we'll return a mock response
    const mockCaseData = {
      id: id,
      title: "Sample Case",
      description: "This is a sample case for testing legal research",
      documents: [],
      legalResearch: []
    };
    
    // Conduct legal research
    const research = await LegalResearchService.conductLegalResearch("contract disputes", mockCaseData);
    
    res.json({ research });
  } catch (error) {
    console.error('Legal research error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;