import { notFound } from "next/navigation";
import Image from "next/image";
import { getCharacterData } from "@/lib/actions/fetch-single-character";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CharacterPageProps {
    params: {
        character: string;
    };
}



export default async function CharacterPage({ params }: CharacterPageProps) {
    const character = await getCharacterData(params.character);

    if (!character) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Character Image */}
                <div className="relative aspect-square w-full max-w-[400px]">
                    <Image
                        src={character.imageUrl || "/placeholder.svg"}
                        alt={character.name}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>

                {/* Character Info */}
                <div className="space-y-6">
                    <h1 className="text-2xl font-bold">{character.name}</h1>

                    <div className="text-sm text-gray-500">
                        Last Updated {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    {character.films && character.films.length > 0 && (
                        <div>
                            <h2 className="text-xl font-[500] mb-2">Featured Films</h2>
                            <ul className="space-y-2">
                                {character.films.map((film: string, index: number) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2">•</span>
                                        {film}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

               
                    {character.tvShows && character.tvShows.length > 0 && (
                        <div>
                            <h2 className="text-xl font-[500] mb-2">TV Shows</h2>
                            <ul className="space-y-2">
                                {character.tvShows.map((show: string, index: number) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2">•</span>
                                        {show}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                 
                    {character.shortFilms && character.shortFilms.length > 0 && (
                        <div>
                            <h2 className="text-xl font-[500] mb-2">Short Films</h2>
                            <ul className="space-y-2">
                                {character.shortFilms.map((film: string, index: number) => (
                                    <li key={index} className="flex items-center">
                                        <span className="mr-2">•</span>
                                        {film}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Button asChild className="bg-disneyBlue hover:bg-disneyBlue/90 text-white text-center">
                        <Link target="_blank" href={character?.url}>Explore more character details</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
