import Anthropic from '@anthropic-ai/sdk';

export class DocumentAnalysisService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  async analyzeDocument(documentId: string, content: string, mimeType: string): Promise<DocumentAnalysis> {
    // Extract text from document based on mime type
    const text = await this.extractText(content, mimeType);
    
    // Generate analysis using Claude
    const analysis = await this.generateAnalysis(text);
    
    // Store analysis in database
    await this.storeAnalysis(documentId, analysis);
    
    return analysis;
  }
  
  private async extractText(content: string, mimeType: string): Promise<string> {
    // For now, we'll assume the content is already text
    // In a more complete implementation, we would handle different file types:
    // - PDF processing
    // - DOCX processing
    // - etc.
    return content;
  }
  
  private async generateAnalysis(text: string): Promise<DocumentAnalysis> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Analyze the following legal document and provide:
          1. A concise summary (3-5 sentences)
          2. Key entities mentioned (people, organizations, locations)
          3. Important dates and deadlines
          4. Main legal issues or claims
          5. Potential risks or concerns
          
          Document:
          ${text.substring(0, 25000)}`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseAnalysisResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parseAnalysisResponse(response: string): DocumentAnalysis {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    return {
      summary: response.substring(0, 500), // Simplified extraction
      entities: {
        people: [],
        organizations: [],
        locations: []
      },
      dates: [],
      legalIssues: [],
      risks: [],
      rawAnalysis: response
    };
  }
  
  private async storeAnalysis(documentId: string, analysis: DocumentAnalysis): Promise<void> {
    // In a complete implementation, this would store the analysis in the database
    console.log(`Storing analysis for document ${documentId}`);
    console.log(analysis);
  }
}

interface DocumentAnalysis {
  summary: string;
  entities: {
    people: string[];
    organizations: string[];
    locations: string[];
  };
  dates: Array<{
    date: string;
    context: string;
  }>;
  legalIssues: string[];
  risks: string[];
  rawAnalysis: string;
}