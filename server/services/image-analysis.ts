import { Anthropic } from '@anthropic-ai/sdk';

export class ImageAnalysisService {
  private anthropic: Anthropic;
  
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }
  
  async analyzeImage(imageBase64: string): Promise<ImageAnalysis> {
    const response = await this.anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide the following information:\n1. Brief description of what's shown\n2. Key objects or elements visible\n3. People present (if any)\n4. Location type (indoor/outdoor, urban/rural, etc.)\n5. Any visible text or signage\n6. Potential relevance to a legal case"
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
              }
            }
          ]
        }
      ]
    });
    
    // Parse the response into structured data
    return this.parseImageAnalysisResponse((response.content[0] as Anthropic.TextBlock).text);
  }
  
  private parseImageAnalysisResponse(response: string): ImageAnalysis {
    // This is a simplified parser - in practice, you might want to use
    // a more robust approach or have Claude return JSON directly
    return {
      description: response.substring(0, 100),
      keyElements: [],
      people: [],
      locationType: "unknown",
      visibleText: "",
      legalRelevance: response.substring(100, 200)
    };
  }
}

interface ImageAnalysis {
  description: string;
  keyElements: string[];
  people: string[];
  locationType: string;
  visibleText: string;
  legalRelevance: string;
}