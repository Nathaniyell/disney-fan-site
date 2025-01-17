"use client"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import logo from "../../../public/logo.png"
import { useState } from "react"

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex h-16 items-center px-4 sm:px-8 justify-between">
        <Link href="/" className="mr-6">
          <Image
            src={logo}
            alt="Disney"
            width={80}
            height={40}
            priority
          />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Find a character..."
                className="h-9 w-full bg-white/95 md:pr-10 placeholder:text-gray-500 dark:bg-white/95 dark:placeholder:text-gray-500 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="ml-6 bg-disneyBlue rounded-full p-2">
          <Avatar className="h-6 w-6 cursor-pointer">
            <AvatarFallback className="bg-disneyBlue">
              <User className="h-4 w-4 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

