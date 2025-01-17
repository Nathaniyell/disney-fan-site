interface DisneyCharacter {
    name: string;
    imageUrl: string;
    url: string;
    films: string[];
}

export async function getDisneyCharacters(): Promise<DisneyCharacter[]> {
    try {
        const characterNames = ['Aladdin', 'Abu', 'Elsa', 'Anna', 'Kristoff', 'Olaf'];

        const characterPromises = characterNames.map(name =>
            fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    if (result.data && !Array.isArray(result.data)) {
                        return result.data.name.toLowerCase() === name.toLowerCase() ? result.data : undefined;
                    }
                    if (Array.isArray(result.data)) {
                        return result.data.find((char: DisneyCharacter) =>
                            char.name.toLowerCase() === name.toLowerCase()
                        );
                    }
                    return undefined;
                })
        );

        const characters = await Promise.all(characterPromises);

        return characters
            .filter((character): character is DisneyCharacter => !!character)
            .map((character: DisneyCharacter) => ({
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