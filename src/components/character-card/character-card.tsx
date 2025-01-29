import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"



interface CharacterCardProps {
  name: string;
  imageUrl: string;
  films: string[];
}

export function CharacterCard({ name, imageUrl, films }: CharacterCardProps) {
  // Encode the character name for the URL
  const encodedName = encodeURIComponent(name);

  return (
    <Card className="w-[300px] rounded-none overflow-hidden bg-white">
      <div className="aspect-square relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-4 text-center space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
        {films.length > 0 && (
          <div className="">
            <p>Featured in:</p>
            <ul className="mt-1">
              {films.slice(0, 4).map((film, index) => (
                <li className="text-sm text-slate-500 flex items-center justify-center space-x-1" key={index}>
                  {film}
                </li>
              ))}
              {films.length > 4 && (
                <li className="text-sm text-slate-500 flex items-center justify-center space-x-1">
                  <span>...</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-center">
        <Button
          asChild
          variant="ghost"
          className="w-full"
        >
          <Link className="underline" href={`/character/${encodedName}`}>
            VIEW PROFILE
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

