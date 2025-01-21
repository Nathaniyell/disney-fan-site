"use client"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, ChevronDown } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import logo from "../../../public/logo.png"
import { useState } from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup')
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (isAuthPage) {
    return null
  }

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
        <div className="ml-6">
          {!loading && (user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback className="bg-disneyBlue">
                    <User className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-disneyBlue">
                  <User className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

