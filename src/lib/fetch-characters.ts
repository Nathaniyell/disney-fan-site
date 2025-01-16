interface DisneyCharacter {
    _id: number;
    name: string;
    // Add other properties based on the API response
}

export async function getDisneyCharacters(): Promise<DisneyCharacter[]> {
    try {
        const response = await fetch("https://api.disneyapi.dev/character");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Disney characters:', error);
        throw error;
    }
}