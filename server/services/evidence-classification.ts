import { Anthropic } from '@anthropic-ai/sdk';

export class EvidenceClassificationService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  async classifyEvidence(evidenceId: string, name: string, description: string, fileType: string): Promise<EvidenceClassification> {
    // Generate classification using Claude
    const classification = await this.generateClassification(name, description, fileType);
    
    // Store classification in database
    await this.storeClassification(evidenceId, classification);
    
    return classification;
  }
  
  private async generateClassification(name: string, description: string, fileType: string): Promise<EvidenceClassification> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Classify the following evidence item for a legal case:
          
          Name: ${name}
          Description: ${description}
          File Type: ${fileType}
          
          Please provide:
          1. Evidence type (document, photo, video, audio, physical item, testimony, etc.)
          2. Relevance score (1-10)
          3. Suggested tags (comma-separated)
          4. Potential sensitivity (public, confidential, sensitive, highly sensitive)
          5. Brief description of what this evidence might show or prove`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseClassificationResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parseClassificationResponse(response: string): EvidenceClassification {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    return {
      evidenceType: "document",
      relevanceScore: 5,
      tags: response.split(',').map(tag => tag.trim()).slice(0, 5),
      sensitivity: "public",
      description: response.substring(0, 200)
    };
  }
  
  private async storeClassification(evidenceId: string, classification: EvidenceClassification): Promise<void> {
    // In a complete implementation, this would store the classification in the database
    console.log(`Storing classification for evidence ${evidenceId}`);
    console.log(classification);
  }
}

interface EvidenceClassification {
  evidenceType: string;
  relevanceScore: number;
  tags: string[];
  sensitivity: 'public' | 'confidential' | 'sensitive' | 'highly sensitive';
  description: string;
}