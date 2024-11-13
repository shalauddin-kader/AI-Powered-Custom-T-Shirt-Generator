"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
  // Define state with specific size options
  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("M");

  // Handler function that ensures only valid sizes are set
  const handleSizeChange = (value: string) => {
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
      setSize(value as "S" | "M" | "L" | "XL" | "XXL");
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
