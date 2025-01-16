import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"


interface CharacterCardProps {
  _id: number;
  name: string;
  imageUrl: string;
  url: string;
  films: string[];
}

export function CharacterCard({ name, imageUrl, url, films }: CharacterCardProps) {

  return (
    <Card className="w-[300px] overflow-hidden bg-white">
      <div className="aspect-square relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
        {films.length > 0 && (
          <div className="text-sm text-gray-500">
            <p>Featured in:</p>
            <ul className="mt-1">
              {films.map((film, index) => (
                <li key={index}>{film}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <Link href={url}>
            VIEW PROFILE
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

