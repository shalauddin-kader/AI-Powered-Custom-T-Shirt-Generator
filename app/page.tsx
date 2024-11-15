import { Dispatch, SetStateAction, useState } from 'react';

// Define size options as a union type
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

// Initialize the state with SizeOptions type
const [size, setSize] = useState<SizeOptions>("M");

// Create a wrapper function to handle the type safely
const handleSizeChange = (value: string) => {
    setSize(value as SizeOptions); // Type assertion ensures compatibility
};

return (
    <div>
        <Label htmlFor="size">Select Size</Label>
        {/* Use handleSizeChange to set the size safely */}
        <Select onValueChange={handleSizeChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
            </SelectContent>
        </Select>
    </div>
);
