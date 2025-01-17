import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface DisneyCharacter {
    name: string;
    imageUrl: string;
    url: string;
    films: string[];
}

interface FeaturedCharactersProps {
    characters: DisneyCharacter[];
}

export function FeaturedCharacters({ characters }: FeaturedCharactersProps) {
    return (
        <div className="max-w-6xl mx-auto px-8 py-12 bg-disneyBlue">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
                Featured Characters!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
                {characters.map((character) => (
                    <div key={character.url} className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="relative h-64 w-full">
                            <Image
                                src={character.imageUrl}
                                alt={character.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-center mb-2">
                                {character.name}
                            </h3>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-1">Featured Films</h4>
                                <p className="text-sm text-gray-600">
                                    {character.films.slice(0, 4).join(", ")}
                                </p>
                            </div>
                            <Link href={`/${character.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <Button className="w-full" variant="outline">
                                    VIEW PROFILE
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 