// Define possible size options
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

// Initialize state with a default size
const [size, setSize] = useState<SizeOptions>("M");

// Wrapper function to enforce string compatibility and type casting
const handleSizeSelect = (value: string) => {
    // Cast to SizeOptions if it matches the defined options
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
        setSize(value as SizeOptions);
    }
};

return (
    <div>
        <Label htmlFor="size">Select Size</Label>
        {/* Pass handleSizeSelect to ensure typing compatibility */}
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
