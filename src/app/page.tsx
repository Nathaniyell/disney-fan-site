import { CharacterCard } from "@/components/character-card/character-card";
import { getDisneyCharacters } from "@/lib/fetch-characters";


export default async function Home() {
  const characters = await getDisneyCharacters()

  return (
    <div className="grid items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Disney Characters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center bg-neutral-200 p-8">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            name={character.name}
            imageUrl={character.imageUrl}
            url={character.url}
            films={character.films}
          />
        ))}
      </div>
    </div>
  );
}

