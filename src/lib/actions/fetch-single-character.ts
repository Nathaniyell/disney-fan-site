/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getCharacterData(name: string) {
    const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('Failed to fetch character');

    const result = await response.json();
    const character = Array.isArray(result.data)
        ? result.data.find((char: any) => char.name.toLowerCase() === name.toLowerCase())
        : result.data;

    if (!character) return null;
    return character;
}