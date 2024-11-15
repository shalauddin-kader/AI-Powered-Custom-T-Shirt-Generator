// Define size options as a union type
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

// Initialize the state with SizeOptions type
const [size, setSize] = useState<SizeOptions>("M");

// Wrapper function for type compatibility
const handleSizeChange = (value: string) => {
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
        setSize(value as SizeOptions); // Type assertion to match SizeOptions type
    }
};

return (
    <div>
        <Label htmlFor="size">Select Size</Label>
        {/* Using handleSizeChange to enforce compatibility */}
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
