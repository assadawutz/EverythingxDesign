
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Type, Modality } from "@google/genai";
import { RepoFileTree, Citation, DataFlowGraph } from '../types';

/**
 * Helper to ensure we always get the freshest key from the environment.
 */
const getAiClient = () => {
  const apiKey = (process.env.API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("API_KEY is not configured. Please ensure a paid API key is selected.");
  }
  return new GoogleGenAI({ apiKey });
};

export interface InfographicResult {
    imageData: string | null;
    citations: Citation[];
}

/**
 * Generates an infographic image for a repository structure.
 */
export async function generateInfographic(
  repoName: string, 
  fileTree: RepoFileTree[], 
  style: string, 
  is3D: boolean = false,
  language: string = "English"
): Promise<string | null> {
  const ai = getAiClient();
  const limitedTree = fileTree.slice(0, 150).map(f => f.path).join(', ');
  
  let styleGuidelines = "";
  if (is3D) {
      styleGuidelines = "VISUAL STYLE: Photorealistic Miniature Diorama, 3D printed model on executive desk, isometric view, tilt-shift.";
  } else {
      styleGuidelines = `VISUAL STYLE: ${style}. 2D flat diagrammatic view.`;
  }

  const prompt = `Create a detailed technical data flow diagram infographic for GitHub repository: "${repoName}".
  STYLE: ${styleGuidelines}
  Text Language: ${language}.
  Context: ${limitedTree}...
  Structure: Input -> Processing -> Output.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Infographic generation failed:", error);
    throw error;
  }
}

/**
 * Generates structured JSON data for D3.js interactive graph.
 */
export async function generateRepoGraphData(
  repoName: string,
  fileTree: RepoFileTree[]
): Promise<DataFlowGraph> {
  const ai = getAiClient();
  const limitedTree = fileTree.slice(0, 200).map(f => f.path).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this file tree for repo "${repoName}". 
      Generate a Dependency Graph JSON.
      - Nodes should represent key files/modules. Group them by folder (0-9).
      - Links should represent imports/calls.
      - "id" must be the file path.
      - "label" is the filename.
      Files:
      ${limitedTree}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  group: { type: Type.INTEGER },
                  label: { type: Type.STRING }
                },
                required: ["id", "group", "label"]
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  value: { type: Type.INTEGER }
                },
                required: ["source", "target", "value"]
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DataFlowGraph;
    }
    throw new Error("Empty response from model");
  } catch (error) {
    console.error("Graph data generation failed:", error);
    throw error;
  }
}

/**
 * Image Generation with specific controls and style support.
 */
export async function generateStudioImage(
  prompt: string,
  aspectRatio: string,
  imageSize: string,
  style?: string
): Promise<string | null> {
  const ai = getAiClient();
  
  let finalPrompt = prompt;
  if (style && style !== 'None') {
    finalPrompt = `${prompt} . Visual Style: ${style}. High quality, detailed.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: finalPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: imageSize as any
        }
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Studio image generation failed:", error);
    throw error;
  }
}

/**
 * Multimodal Chat with Thinking Mode.
 */
export async function multimodalChat(
  prompt: string,
  history: { role: string; parts: any[] }[],
  files: { data: string; mimeType: string }[],
  useThinking: boolean = true
): Promise<string> {
  const ai = getAiClient();
  
  const currentParts: any[] = files.map(f => ({
    inlineData: { data: f.data, mimeType: f.mimeType }
  }));
  currentParts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: currentParts }
      ],
      config: {
        thinkingConfig: useThinking ? { thinkingBudget: 32768 } : { thinkingBudget: 0 },
      }
    });

    return response.text || "No response received.";
  } catch (error) {
    console.error("Multimodal chat failed:", error);
    throw error;
  }
}

/**
 * Low-latency response using Flash Lite.
 */
export async function getQuickResponse(prompt: string): Promise<string> {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    return response.text || "No response.";
  } catch (error) {
    console.error("Quick response failed:", error);
    throw error;
  }
}

export async function askNodeSpecificQuestion(
  nodeLabel: string, 
  question: string, 
  fileTree: RepoFileTree[]
): Promise<string> {
  const ai = getAiClient();
  const limitedTree = fileTree.slice(0, 300).map(f => f.path).join('\n');
  const prompt = `Node: "${nodeLabel}". Tree:\n${limitedTree}\nQuestion: "${question}"`;
  try {
    const response = await ai.models.generateContent({
       model: 'gemini-3-pro-preview',
       contents: prompt
    });
    return response.text || "No answer generated.";
  } catch (error) {
    console.error("Node Q&A failed:", error);
    throw error;
  }
}

export async function generateArticleInfographic(
  url: string, 
  style: string, 
  onProgress?: (stage: string) => void,
  language: string = "English"
): Promise<InfographicResult> {
    const ai = getAiClient();
    if (onProgress) onProgress("RESEARCHING CONTENT...");
    
    let structuralSummary = "";
    let citations: Citation[] = [];

    try {
        const analysisResponse = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Analyze ${url} for an infographic in ${language}.`,
            config: { tools: [{ googleSearch: {} }] }
        });
        structuralSummary = analysisResponse.text || "";
        const chunks = analysisResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
            citations = chunks.map((c: any) => ({ uri: c.web?.uri, title: c.web?.title })).filter((c: any) => c.uri);
        }
    } catch (e) {
        structuralSummary = `Summary of ${url} in ${language}.`;
    }

    if (onProgress) onProgress("RENDERING INFOGRAPHIC...");

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: `Create infographic: ${structuralSummary}. Style: ${style}. Language: ${language}.`,
            config: { imageConfig: { aspectRatio: "1:1" } },
        });

        let imageData = null;
        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData?.data) {
                    imageData = part.inlineData.data;
                    break;
                }
            }
        }
        return { imageData, citations };
    } catch (error) {
        console.error("Article infographic generation failed:", error);
        throw error;
    }
}

export async function generateCodeSnippet(
    prompt: string, 
    language: string, 
    contextImage?: { data: string, mimeType: string },
    systemContext?: string
): Promise<string> {
    const ai = getAiClient();
    const parts: any[] = [{ text: prompt }];
    
    // Logic to handle Design-to-Code: Inject image into parts if present
    if (contextImage) {
        parts.unshift({ inlineData: { data: contextImage.data, mimeType: contextImage.mimeType } });
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: { parts },
            config: { 
              systemInstruction: `You are an expert World-Class Software Engineer. Generate clean, efficient code for ${language}.
              
              ${systemContext || ""}
              
              Output ONLY the raw code block. No markdown backticks, no explanation.`
            }
        });
        return response.text || "Failed to generate code.";
    } catch (error) {
        // Detailed error logging for debugging API key issues
        console.error("Code generation failed:", error);
        throw error;
    }
}

export async function editImageWithGemini(
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<string | null> {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ inlineData: { data: base64Data, mimeType: mimeType } }, { text: prompt }] },
    });
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData?.data) return part.inlineData.data;
      }
    }
    return null;
  } catch (error) {
    console.error("Image editing failed:", error);
    throw error;
  }
}
