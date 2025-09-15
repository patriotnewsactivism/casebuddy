import { Anthropic } from '@anthropic-ai/sdk';

// Only initialize Anthropic if API key is available
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

export class TimelinePredictionService {
  static async predictTimelineEvents(caseData) {
    try {
      let predictionText = '';
      
      // Generate timeline predictions using Claude if available
      if (anthropic) {
        const response = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Based on the following case information, please predict potential future timeline events with estimated dates. 
              Return your response as a JSON object with the following structure:
              {
                "events": [
                  {
                    "event": "string describing the event",
                    "date": "string with estimated date (YYYY-MM-DD format)",
                    "confidence": number (0-100),
                    "explanation": "string explaining your prediction"
                  }
                ]
              }
              
              Case information:
              Title: ${caseData.title}
              Description: ${caseData.description}
              Documents: ${caseData.documents ? caseData.documents.map(doc => doc.name + ": " + doc.content.substring(0, 1000)).join("\\n") : "None provided"}
              Existing timeline events: ${caseData.timelineEvents ? caseData.timelineEvents.map(event => event.date + " - " + event.description).join("\\n") : "None provided"}`
            }
          ]
        });
        
        predictionText = response.content[0].text;
      } else {
        // Mock prediction for development without API key
        predictionText = JSON.stringify({
          events: [
            {
              event: "Discovery phase begins",
              date: "2025-10-01",
              confidence: 85,
              explanation: "This is a mock prediction. Based on typical legal case progression, the discovery phase would likely begin within two weeks of the case filing."
            },
            {
              event: "Depositions scheduled",
              date: "2025-11-15",
              confidence: 75,
              explanation: "This is a mock prediction. Depositions are typically scheduled 1-2 months after the discovery phase begins."
            },
            {
              event: "Motion for summary judgment filed",
              date: "2026-01-30",
              confidence: 60,
              explanation: "This is a mock prediction. A motion for summary judgment might be filed 3-4 months after the case begins, depending on the complexity of the issues."
            }
          ]
        });
      }
      
      // Parse the response into structured data
      let prediction;
      if (anthropic) {
        // When using the actual API, we need to extract the JSON from the response
        const jsonStart = predictionText.indexOf('{');
        const jsonEnd = predictionText.lastIndexOf('}') + 1;
        const jsonString = predictionText.substring(jsonStart, jsonEnd);
        prediction = JSON.parse(jsonString);
      } else {
        // When using mock data, it's already a JSON string
        prediction = JSON.parse(predictionText);
      }
      
      return prediction;
    } catch (error) {
      console.error('Timeline prediction error:', error);
      throw error;
    }
  }
}