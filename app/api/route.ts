import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define the structure of the incoming request for T-shirt design generation
interface TShirtDesignRequest {
  prompt: string; // User input text to generate an image
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'; // Selected T-shirt size
  color: string; // Selected T-shirt color
}

// Define the structure of the response for T-shirt design generation
interface TShirtDesignResponse {
  imageUrl: string; // URL of the generated AI image for the T-shirt
  message: string; // Success message or error information
}

// Initialize OpenAI API client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate an image using OpenAI's DALL-E 3 model
async function generateImage(data: TShirtDesignRequest): Promise<string> {
  console.log("Generating image with data:", JSON.stringify(data));

  const prompt = `Generate an image based on the following description:
  
  Main concept: ${data.prompt}
  
  Please ensure the image:
  1. Accurately represents the main concept
  2. Is visually appealing and fits the selected size and color
  3. Avoids any inappropriate or offensive content
  
  Provide a high-quality visual representation of the concept, suitable for a T-shirt design.`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024", // Fixed size for T-shirt images
    });

    console.log("OpenAI API response:", JSON.stringify(response));

    if (response.data && response.data[0] && response.data[0].url) {
      console.log("Generated image URL:", response.data[0].url);
      return response.data[0].url;
    }

    throw new Error("No image URL in the response");
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}

// Main POST function for the Next.js API route
export async function POST(req: Request) {
  console.log("Received POST request");

  try {
    // Parse the incoming JSON request
    const data: TShirtDesignRequest = await req.json();
    console.log("Parsed request data:", JSON.stringify(data));

    // Validate request data
    if (!data.prompt || typeof data.prompt !== 'string') {
      console.error("Invalid prompt:", data.prompt);
      return NextResponse.json(
        { message: "Invalid prompt." },
        { status: 400 }
      );
    }

    if (!data.size || !['S', 'M', 'L', 'XL', 'XXL'].includes(data.size)) {
      console.error("Invalid size:", data.size);
      return NextResponse.json(
        { message: "Invalid size." },
        { status: 400 }
      );
    }

    if (!data.color || typeof data.color !== 'string') {
      console.error("Invalid color:", data.color);
      return NextResponse.json(
        { message: "Invalid color." },
        { status: 400 }
      );
    }

    // Call OpenAI API to generate the image
    const imageUrl = await generateImage(data);
    console.log("Image generated successfully");

    // Return the response with the generated image URL
    return NextResponse.json({ imageUrl, message: "Image generated successfully." } as TShirtDesignResponse, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    // Handle any unexpected errors
    return NextResponse.json(
      {
        error: "Failed to generate image.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}