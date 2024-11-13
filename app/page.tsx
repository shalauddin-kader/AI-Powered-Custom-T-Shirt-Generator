"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define a type for the size options
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

export default function Page() {
  // Initialize state with type constraint
  const [size, setSize] = useState<SizeOptions>("M");

  // New handler to explicitly match types
  const handleSizeChange = (value: string) => {
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
      setSize(value as SizeOptions); // Assert as SizeOptions to match setSize's expected type
    }
  };

  return (
    <div>
      <Label htmlFor="size">Select Size</Label>
      <Select onValueChange={handleSizeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="S">Small</SelectItem>
          <SelectItem value="M">Medium</SelectItem>
          <SelectItem value="L">Large</SelectItem>
          <SelectItem value="XL">Extra Large</SelectItem>
          <SelectItem value="XXL">2X Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
