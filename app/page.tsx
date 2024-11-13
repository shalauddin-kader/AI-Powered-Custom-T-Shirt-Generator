import { useState } from 'react';
import { Select, SelectTrigger, SelectValue } from 'path-to-your-select-components';
import { Label } from 'path-to-your-label-component';

const Page = () => {
  // Define the state to hold the selected size, restricted to certain values
  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("M");

  // Handler for the onValueChange event with explicit typing for compatibility
  const handleSizeChange = (value: string) => {
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
      setSize(value as "S" | "M" | "L" | "XL" | "XXL");
    }
  };

  return (
    <div>
      <Label htmlFor="size">Select Size</Label>
      {/* Updated Select component to use the handleSizeChange function */}
      <Select onValueChange={handleSizeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        {/* Define options for each size */}
        <div className="select-options">
          <div onClick={() => handleSizeChange("S")}>S</div>
          <div onClick={() => handleSizeChange("M")}>M</div>
          <div onClick={() => handleSizeChange("L")}>L</div>
          <div onClick={() => handleSizeChange("XL")}>XL</div>
          <div onClick={() => handleSizeChange("XXL")}>XXL</div>
        </div>
      </Select>
    </div>
  );
};

export default Page;
