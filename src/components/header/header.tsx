"use client"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import logo from "../../../public/logo.png"


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="max-w-6xl mx-auto flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="mr-8">
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
            <div className="relative">
              <Input
                type="search"
                placeholder="Find a character..."
                className="h-9 w-full bg-white/95 pr-10 placeholder:text-gray-500 dark:bg-white/95 dark:placeholder:text-gray-500 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="ml-8 bg-disneyBlue rounded-full p-2">
          <Avatar className="h-6 w-6 cursor-pointer">
            <AvatarFallback className=" bg-disneyBlue">
              <User className="h-4 w-4 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

