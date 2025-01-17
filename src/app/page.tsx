import { CharacterCard } from "@/components/character-card/character-card";
import { FeaturedCharacters } from "@/components/featured-characters";
import { getDisneyCharacters } from "@/lib/actions/fetch-characters";
import { getFeaturedCharacters } from "@/lib/actions/fetch-featured-characters";

export default async function Home() {
  const characters = await getDisneyCharacters()
  const featuredCharacters = await getFeaturedCharacters()
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen pb-10 mt-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center bg-neutral-200 p-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              name={character.name}
              imageUrl={character.imageUrl}
              films={character.films}
            />
          ))}
        </div>
      </div>
      <FeaturedCharacters characters={featuredCharacters} />
    </div>
  );
}

