import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#051138]">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="mr-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zZ5xkWXpYdQ4DRpYj2qEJqzWVX66U5.png"
            alt="Disney"
            width={80}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Input
                type="search"
                placeholder="Find a character..."
                className="h-9 w-full bg-white/95 pr-10 placeholder:text-gray-500 dark:bg-white/95 dark:placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="ml-8">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarFallback className="bg-transparent">
              <UserCircle className="h-8 w-8 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

