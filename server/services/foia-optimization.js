import { Anthropic } from '@anthropic-ai/sdk';

// Only initialize Anthropic if API key is available
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

export class FOIAOptimizationService {
  static async optimizeFOIARequest(requestData) {
    try {
      let optimizationText = '';
      
      // Generate FOIA request optimization using Claude if available
      if (anthropic) {
        const response = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `Based on the following FOIA request information, please optimize the request language to improve the chances of receiving the desired documents. 
              Return your response as a JSON object with the following structure:
              {
                "optimizedRequest": "string with the optimized request language",
                "explanation": "string explaining the optimizations made",
                "keyImprovements": [
                  "string describing a key improvement",
                  "another improvement",
                  // ... more improvements
                ]
              }
              
              FOIA request information:
              Subject: ${requestData.subject}
              Description: ${requestData.description}
              RequestedDocuments: ${requestData.requestedDocuments ? requestData.requestedDocuments.join("\\n") : "None provided"}
              RelevantLaws: ${requestData.relevantLaws ? requestData.relevantLaws.join("\\n") : "None provided"}`
            }
          ]
        });
        
        optimizationText = response.content[0].text;
      } else {
        // Mock optimization for development without API key
        optimizationText = JSON.stringify({
          optimizedRequest: `I request the following documents under the Freedom of Information Act:\\n\\n1. All contracts between the agency and private vendors from January 1, 2020, to December 31, 2024.\\n2. Correspondence related to the awarding of these contracts.\\n3. Financial records showing payments made to these vendors.\\n\\nI am a journalist investigating government spending practices and these documents are essential for my reporting.`,
          explanation: "This is a mock optimization. The optimized request is more specific about the time frame and types of documents requested, and includes a clear statement of purpose which can help improve the chances of receiving the documents.",
          keyImprovements: [
            "Added specific time frame (2020-2024) to narrow the scope of the request",
            "Clarified document types requested (contracts, correspondence, financial records)",
            "Provided a clear statement of purpose as a journalist investigation",
            "Structured the request in a more organized format"
          ]
        });
      }
      
      // Parse the response into structured data
      let optimization;
      if (anthropic) {
        // When using the actual API, we need to extract the JSON from the response
        const jsonStart = optimizationText.indexOf('{');
        const jsonEnd = optimizationText.lastIndexOf('}') + 1;
        const jsonString = optimizationText.substring(jsonStart, jsonEnd);
        optimization = JSON.parse(jsonString);
      } else {
        // When using mock data, it's already a JSON string
        optimization = JSON.parse(optimizationText);
      }
      
      return optimization;
    } catch (error) {
      console.error('FOIA optimization error:', error);
      throw error;
    }
  }
}