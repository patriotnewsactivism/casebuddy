import { Router } from 'express';
import { EvidenceClassificationService } from '../services/evidence-classification';

const router = Router();

// Classify evidence endpoint
router.post('/evidence/classify', async (req, res) => {
  try {
    const { content } = req.body;
    
    // Validate input
    if (!content) {
      return res.status(400).json({ error: 'Missing required field: content' });
    }
    
    // Classify evidence
    const classification = await EvidenceClassificationService.classifyEvidence(content);
    
    res.json({ classification });
  } catch (error) {
    console.error('Evidence classification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;