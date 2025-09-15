import { Anthropic } from '@anthropic-ai/sdk';

export class LegalResearchService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  async generateResearchQueries(caseDescription: string, issue: string): Promise<string[]> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Generate effective legal research queries for the following case and issue:
          
          Case Description: ${caseDescription}
          Legal Issue: ${issue}
          
          Please provide 5 specific search queries that would be effective for researching this issue in legal databases.`
        }
      ]
    });
    
    // Parse the response into an array of queries
    return this.parseQueriesResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  async summarizeResearchResults(results: string): Promise<ResearchSummary> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Summarize the following legal research results:
          
          ${results}
          
          Please provide:
          1. A concise summary of key findings
          2. Relevant precedents or cases
          3. Applicable statutes or regulations
          4. Key legal principles
          5. How these findings might apply to a case`
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseSummaryResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parseQueriesResponse(response: string): string[] {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    return response.split('\n')
      .filter(line => line.trim() !== '' && !line.startsWith('#'))
      .map(query => query.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 5);
  }
  
  private parseSummaryResponse(response: string): ResearchSummary {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    const lines = response.split('\n').filter(line => line.trim() !== '');
    
    return {
      summary: lines.slice(0, 3).join(' '),
      precedents: lines.slice(3, 6),
      statutes: lines.slice(6, 9),
      principles: lines.slice(9, 12),
      application: lines.slice(12, 15).join(' ')
    };
  }
}

interface ResearchSummary {
  summary: string;
  precedents: string[];
  statutes: string[];
  principles: string[];
  application: string;
}