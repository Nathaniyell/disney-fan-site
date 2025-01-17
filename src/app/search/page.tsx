"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchCharacters } from '@/lib/actions/search-characters'
import { CharacterCard } from '@/components/character-card/character-card'
import { Loader2 } from 'lucide-react'

interface Character {
    _id: string;
    name: string;
    imageUrl: string;
    films: string[];
}

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [results, setResults] = useState<Character[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchResults() {
            if (!query) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const searchResults = await searchCharacters(query)
                setResults(searchResults)
            } catch (error) {
                console.error('Error fetching results:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [query])

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                {query ? `Search results for "${query}"` : 'Search Results'}
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((character) => (
                        <CharacterCard
                            key={character._id}
                            name={character.name}
                            imageUrl={character.imageUrl || "/placeholder.svg"}
                            films={character.films || []}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    {query ? 'No results found' : 'Enter a search term to begin'}
                </div>
            )}
        </main>
    )
} 