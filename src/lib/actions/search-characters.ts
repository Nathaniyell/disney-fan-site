export async function searchCharacters(query: string) {
    if (!query) return [];

    try {
        const encodedQuery = encodeURIComponent(query.trim());
        const response = await fetch(`https://api.disneyapi.dev/character?name=${encodedQuery}`);
        const data = await response.json();

        return data.data || [];
    } catch (error) {
        console.error('Error searching characters:', error);
        return [];
    }
} 