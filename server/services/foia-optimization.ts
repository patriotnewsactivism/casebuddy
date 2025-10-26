import { Anthropic } from '@anthropic-ai/sdk';

export class FoiaOptimizationService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  // Static method for route usage
  static async optimizeFOIARequest(requestData: any): Promise<OptimizedFoiaRequest> {
    const service = new FoiaOptimizationService();
    const subject = typeof requestData === 'object' ? requestData.subject || '' : String(requestData);
    const description = typeof requestData === 'object' ? requestData.description || '' : '';
    return service.optimizeRequest(subject, description);
  }
  
  async optimizeRequest(subject: string, description: string): Promise<OptimizedFoiaRequest> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Optimize the following FOIA (Freedom of Information Act) request to increase chances of success:
          
          Subject: ${subject}
          Description: ${description}
          
          Please provide:
          1. An optimized subject line
          2. An optimized request description with clear, specific language
          3. Suggested additional details to include
          4. Recommended agencies to submit to
          5. Tips for this specific request`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseOptimizationResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  async generateTemplate(category: string): Promise<FoiaTemplate> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Generate a FOIA (Freedom of Information Act) request template for the category: ${category}
          
          Please provide:
          1. A subject line template
          2. A request body template with placeholders for specific details
          3. Suggested attachments or supporting documents
          4. Recommended agencies for this type of request
          5. Tips for success with this category of request`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseTemplateResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parseOptimizationResponse(response: string): OptimizedFoiaRequest {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    const lines = response.split('\n').filter(line => line.trim() !== '');
    
    return {
      optimizedSubject: lines[0] || "Optimized FOIA Request Subject",
      optimizedDescription: lines.slice(1, 5).join(' ') || "Optimized FOIA Request Description",
      suggestedDetails: lines.slice(5, 8),
      recommendedAgencies: lines.slice(8, 10),
      tips: lines.slice(10, 15)
    };
  }
  
  private parseTemplateResponse(response: string): FoiaTemplate {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    const lines = response.split('\n').filter(line => line.trim() !== '');
    
    return {
      category: "General",
      subjectTemplate: lines[0] || "FOIA Request Subject Template",
      bodyTemplate: lines.slice(1, 6).join(' ') || "FOIA Request Body Template",
      suggestedAttachments: lines.slice(6, 8),
      recommendedAgencies: lines.slice(8, 10),
      tips: lines.slice(10, 15)
    };
  }
}

interface OptimizedFoiaRequest {
  optimizedSubject: string;
  optimizedDescription: string;
  suggestedDetails: string[];
  recommendedAgencies: string[];
  tips: string[];
}

interface FoiaTemplate {
  category: string;
  subjectTemplate: string;
  bodyTemplate: string;
  suggestedAttachments: string[];
  recommendedAgencies: string[];
  tips: string[];
}