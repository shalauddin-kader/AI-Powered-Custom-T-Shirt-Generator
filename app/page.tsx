// Define possible size options
type SizeOptions = "S" | "M" | "L" | "XL" | "XXL";

// Initialize state with a default size
const [size, setSize] = useState<SizeOptions>("M");

// Conversion function to safely set size with correct type
const handleSizeChange = (value: string) => {
    // Check if the value is a valid size option
    if (["S", "M", "L", "XL", "XXL"].includes(value)) {
        setSize(value as SizeOptions);
    } else {
        console.warn("Invalid size option selected:", value);
    }
};

return (
    <div>
        <Label htmlFor="size">Select Size</Label>
        {/* Use handleSizeChange to ensure typing compliance */}
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
