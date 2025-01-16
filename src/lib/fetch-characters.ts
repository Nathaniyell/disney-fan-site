interface DisneyCharacter {
    _id: number;
    name: string;
    imageUrl: string;
    url: string;
    films: string[];
}

export async function getDisneyCharacters(): Promise<DisneyCharacter[]> {
    try {
        const response = await fetch("https://api.disneyapi.dev/character");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();

        return data
            .filter((character: DisneyCharacter) => character.films && character.films.length > 0)
            .map((character: DisneyCharacter) => ({
                _id: character._id,
                name: character.name,
                imageUrl: character.imageUrl,
                url: character.url,
                films: character.films
            }));
    } catch (error) {
        console.error('Error fetching Disney characters:', error);
        throw error;
    }
}