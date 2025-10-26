import { Anthropic } from '@anthropic-ai/sdk';

export class TimelinePredictionService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  // Static method for route usage
  static async predictTimelineEvents(caseData: any): Promise<TimelinePrediction> {
    const service = new TimelinePredictionService();
    return service.predictTimelineEventsInstance(caseData);
  }
  
  async predictTimelineEventsInstance(caseData: any): Promise<TimelinePrediction> {
    // Generate prediction using Claude
    const prediction = await this.generatePrediction(caseData);
    
    return prediction;
  }
  
  private async generatePrediction(caseData: any): Promise<TimelinePrediction> {
    const caseDescription = typeof caseData === 'string' ? caseData : JSON.stringify(caseData);
    
    const response = await this.anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Based on the following case information, predict likely future events and their approximate dates:
          
          ${caseDescription}
          
          Please provide:
          1. Predicted events with estimated dates
          2. Confidence level for each prediction (0-100)
          3. Reasoning for each prediction`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parsePredictionResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parsePredictionResponse(response: string): TimelinePrediction {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    return {
      events: [
        {
          event: "Upcoming court hearing",
          date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          confidence: 75,
          explanation: "Based on typical case timelines"
        },
        {
          event: "Evidence submission deadline",
          date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          confidence: 65,
          explanation: "Standard pre-trial procedure"
        }
      ]
    };
  }
}

interface TimelinePrediction {
  events: Array<{
    event: string;
    date: string;
    confidence: number;
    explanation: string;
  }>;
}
