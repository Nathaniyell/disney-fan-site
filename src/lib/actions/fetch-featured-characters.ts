interface DisneyCharacter {
    name: string;
    imageUrl: string;
    url: string;
    films: string[];
}

export async function getFeaturedCharacters(): Promise<DisneyCharacter[]> {
    try {
   
        const featuredNames = [ 'Winnie the Pooh', 'Simba','Mickey Mouse','Cinderella',];

        const characterPromises = featuredNames.map(name =>
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

        return characters.filter((character): character is DisneyCharacter => !!character);
    } catch (error) {
        console.error('Error fetching featured Disney characters:', error);
        throw error;
    }
} 