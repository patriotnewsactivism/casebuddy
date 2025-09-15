import { Anthropic } from '@anthropic-ai/sdk';

// Only initialize Anthropic if API key is available
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

export class LegalResearchService {
  static async conductLegalResearch(researchQuery, caseData) {
    try {
      let researchText = '';
      
      // Generate legal research using Claude if available
      if (anthropic) {
        const response = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Based on the following legal research query and case information, please provide relevant legal research results. 
              Return your response as a JSON object with the following structure:
              {
                "researchSummary": "string summarizing the research findings",
                "relevantCases": [
                  {
                    "caseName": "string with the case name",
                    "citation": "string with the case citation",
                    "summary": "string summarizing the case",
                    "relevance": "string explaining the relevance to the current case"
                  }
                ],
                "relevantLaws": [
                  {
                    "lawName": "string with the law name",
                    "citation": "string with the law citation",
                    "summary": "string summarizing the law",
                    "relevance": "string explaining the relevance to the current case"
                  }
                ],
                "researchStrategy": "string with recommended research strategy"
              }
              
              Research query:
              ${researchQuery}
              
              Case information:
              Title: ${caseData.title}
              Description: ${caseData.description}
              Documents: ${caseData.documents ? caseData.documents.map(doc => doc.name + ": " + doc.content.substring(0, 1000)).join("\\n") : "None provided"}
              Existing legal research: ${caseData.legalResearch ? caseData.legalResearch.map(research => research.topic + ": " + research.findings).join("\\n") : "None provided"}`
            }
          ]
        });
        
        researchText = response.content[0].text;
      } else {
        // Mock research for development without API key
        researchText = JSON.stringify({
          researchSummary: "This is a mock legal research summary. Based on the query about contract disputes, several relevant cases and laws have been identified.",
          relevantCases: [
            {
              caseName: "Smith v. Example Corp.",
              citation: "123 F.Supp.3d 456 (N.D. Cal. 2025)",
              summary: "This mock case dealt with a contract dispute between a client and a corporation over service agreements.",
              relevance: "The case is highly relevant as it involves similar contract dispute issues in the same jurisdiction."
            },
            {
              caseName: "Doe v. Vendor Solutions Inc.",
              citation: "456 F.Supp.3d 789 (S.D. N.Y. 2024)",
              summary: "This mock case addressed breach of contract claims in vendor-client relationships.",
              relevance: "The case provides useful precedent for handling vendor contract disputes."
            }
          ],
          relevantLaws: [
            {
              lawName: "Uniform Commercial Code (UCC) Article 2",
              citation: "UCC Article 2",
              summary: "This mock law governs contracts for the sale of goods.",
              relevance: "UCC Article 2 is directly applicable to contract disputes involving goods or services."
            },
            {
              lawName: "Federal Rules of Civil Procedure",
              citation: "FRCP Rule 56",
              summary: "This mock rule addresses summary judgment procedures in civil cases.",
              relevance: "FRCP Rule 56 is relevant for understanding motion practice in contract disputes."
            }
          ],
          researchStrategy: "This is a mock research strategy. It is recommended to review the identified cases and laws in detail, and to search for additional cases in the same jurisdiction involving similar contract issues."
        });
      }
      
      // Parse the response into structured data
      let research;
      if (anthropic) {
        // When using the actual API, we need to extract the JSON from the response
        const jsonStart = researchText.indexOf('{');
        const jsonEnd = researchText.lastIndexOf('}') + 1;
        const jsonString = researchText.substring(jsonStart, jsonEnd);
        research = JSON.parse(jsonString);
      } else {
        // When using mock data, it's already a JSON string
        research = JSON.parse(researchText);
      }
      
      return research;
    } catch (error) {
      console.error('Legal research error:', error);
      throw error;
    }
  }
}