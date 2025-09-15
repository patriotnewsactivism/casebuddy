import { Anthropic } from '@anthropic-ai/sdk';

// Only initialize Anthropic if API key is available
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

export class EvidenceClassificationService {
  static async classifyEvidence(content) {
    try {
      let classificationText = '';
      
      // Generate classification using Claude if available
      if (anthropic) {
        const response = await anthropic.messages.create({
          model: "claude-3-haiko-20240307",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Please classify the following piece of evidence and suggest relevant tags for it. 
              Return your response as a JSON object with the following structure:
              {
                "evidenceType": "string (e.g., 'Document', 'Email', 'Contract', 'Photograph', 'Video', 'Audio', etc.)",
                "tags": ["array", "of", "strings"],
                "confidence": number (0-100),
                "explanation": "string explaining your classification"
              }
              
              Evidence content:
              ${content.substring(0, 25000)}`
            }
          ]
        });
        
        classificationText = response.content[0].text;
      } else {
        // Mock classification for development without API key
        classificationText = JSON.stringify({
          evidenceType: "Document",
          tags: ["contract", "legal", "agreement"],
          confidence: 95,
          explanation: "This is a mock classification. The evidence appears to be a legal document, likely a contract or agreement based on the content structure."
        });
      }
      
      // Parse the response into structured data
      let classification;
      if (anthropic) {
        // When using the actual API, we need to extract the JSON from the response
        const jsonStart = classificationText.indexOf('{');
        const jsonEnd = classificationText.lastIndexOf('}') + 1;
        const jsonString = classificationText.substring(jsonStart, jsonEnd);
        classification = JSON.parse(jsonString);
      } else {
        // When using mock data, it's already a JSON string
        classification = JSON.parse(classificationText);
      }
      
      return classification;
    } catch (error) {
      console.error('Evidence classification error:', error);
      throw error;
    }
  }
}