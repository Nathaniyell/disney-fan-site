import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"


interface CharacterCardProps {
  name: string
  image: string
  films: string[]
  profileUrl: string
}

export function CharacterCard({ name, image, films, profileUrl }: CharacterCardProps) {

  return (
    <Card className="w-[300px] overflow-hidden bg-white">
      <div className="aspect-square relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
        <div className="space-y-2">
          <h3 className="font-semibold">Featured Films</h3>
          <p className="text-sm text-muted-foreground">
            {films.join(", ")}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <Link href={profileUrl}>
            VIEW PROFILE
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

