"use client"
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

export default function ProfilePage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!user) {
        router.push('/login')
        return null
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto p-6">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="bg-disneyBlue">
                            <User className="h-12 w-12 text-white" />
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">{user.displayName || 'Disney Fan'}</h1>
                    <p className="text-gray-500">Last Updated May 20th, 2024</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Age</p>
                        <p>26</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Location</p>
                        <p>San Francisco, CA</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Favorite Disney Character</p>
                        <p>Elsa</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Favorite Disney Ride</p>
                        <p>Space Mountain</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Favorite Disney Movie</p>
                        <p>Moana</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-500">Favorite Disneyland</p>
                        <p>Disney World, Florida</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Button variant="default" className="w-full bg-disneyBlue">
                        Edit Profile
                    </Button>
                </div>
            </Card>
        </div>
    )
} 