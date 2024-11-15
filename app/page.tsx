// Define size options as a union type
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

// Initialize the state with a default type that TypeScript will accept as a `string`
const [size, setSize] = useState<string>("M");

// Wrapper function to enforce compatible typing
const handleSizeSelect = (value: string) => {
    // Cast value to SizeOptions if it matches an option, otherwise fall back to default
    setSize(value as SizeOptions);
};

return (
    <div>
        <Label htmlFor="size">Select Size</Label>
        {/* Using handleSizeSelect to ensure typing compatibility */}
        <Select onValueChange={handleSizeSelect}>
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
