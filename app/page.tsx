'use client';
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TShirtDesignRequest {
  prompt: string; // User input text to generate an image
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'; // Selected T-shirt size
  color: string; // Selected T-shirt color
}

interface TShirtDesignResponse {
  imageUrl: string; // URL of the generated AI image for the T-shirt
  message: string; // Success message or error information
}

const TShirtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [size, setSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [color, setColor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    
    const requestBody: TShirtDesignRequest = { prompt, size, color };
    
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data: TShirtDesignResponse = await response.json();
      
      if (response.ok) {
        setImageUrl(data.imageUrl);
        setResponseMessage(data.message);
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      setResponseMessage("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>AI-Powered Custom T-Shirt Generator</CardTitle>
        <CardDescription>Generate a custom T-shirt with your unique design!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="prompt">Your Design Prompt</Label>
            <Input 
              id="prompt" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="Enter your design prompt here..." 
            />
          </div>

          <div>
            <Label htmlFor="size">Select Size</Label>
              <Select onValueChange={(value: string) => setSize(value as SetStateAction<"S" | "M" | "L" | "XL" | "XXL">)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
                  <SelectItem key={sizeOption} value={sizeOption}>{sizeOption}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">T-Shirt Color</Label>
            <Input 
              id="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              placeholder="Enter color (e.g., red, blue)" 
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate T-Shirt"}
          </Button>
        </form>
        {responseMessage && <p className="mt-4">{responseMessage}</p>}
        {imageUrl && <img src={imageUrl} alt="Generated T-Shirt Design" className="mt-4 rounded-md" />}
      </CardContent>
    </Card>
  );
};

export default TShirtGenerator;
