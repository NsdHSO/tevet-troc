
// Helper function to parse filterBy query string
export function parseFilterParams<T extends string>(filterBy: string | undefined): Record<T, string | number | boolean> {
    if (!filterBy) return {} as Record<T, string | number | boolean>;

    // Split by commas to get individual filters
    const filterPairs = filterBy.split(',');

    // Convert filter pairs to an object
    const filters: Record<string, string | number | boolean> = {};

    filterPairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
            const trimmedKey = key.trim() as T;
            let parsedValue = value.trim().replace(/['"]/g, '') as any; // Remove quotes around value

            // Try to parse the value as number or boolean
            if (!isNaN(Number(parsedValue))) {
                parsedValue = Number(parsedValue); // Parse as number
            } else if (parsedValue.toLowerCase() === 'true' || parsedValue.toLowerCase() === 'false') {
                parsedValue = parsedValue.toLowerCase() === 'true'; // Parse as boolean
            }

            filters[trimmedKey] = parsedValue; // Assign the parsed value
        }
    });

    return filters;
}
