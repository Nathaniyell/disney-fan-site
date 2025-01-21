"use client"
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

interface ProfileData {
    firstName: string
    lastName: string
    birthDate: string
    city: string
    state: string
    favoriteCharacter: string
    favoriteMovie: string
    favoriteRide: string
    favoriteDisneyland: string
    updatedAt: string
}

export default function ProfilePage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [profileData, setProfileData] = useState<ProfileData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfileData = async () => {
            if (user) {
                try {
                    const db = getFirestore()
                    const userRef = doc(db, 'users', user.uid)
                    const userDoc = await getDoc(userRef)

                    if (userDoc.exists()) {
                        setProfileData(userDoc.data() as ProfileData)
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        if (user) {
            fetchProfileData()
        }
    }, [user])

    if (loading || isLoading) {
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
            <Card className="max-w-4xl mx-auto p-6 shadow-none border-none bg-neutral-200 rounded-none">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.photoURL || undefined} />
                        <AvatarFallback className="bg-disneyBlue">
                            <User className="h-12 w-12 text-white" />
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold">
                        {profileData ? `${profileData.firstName} ${profileData.lastName}` : user.displayName || 'Disney Fan'}
                    </h1>
                    <p className="text-gray-500">
                        Last Updated {profileData?.updatedAt ? new Date(profileData.updatedAt).toLocaleDateString() : 'Never'}
                    </p>
                </div>

                <div className="space-y-4">
                    {profileData?.birthDate && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Birth Date</p>
                            <p>{new Date(profileData.birthDate).toLocaleDateString()}</p>
                        </div>
                    )}

                    {(profileData?.city || profileData?.state) && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Location</p>
                            <p>{[profileData.city, profileData.state].filter(Boolean).join(', ')}</p>
                        </div>
                    )}

                    {profileData?.favoriteCharacter && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Favorite Disney Character</p>
                            <p>{profileData.favoriteCharacter}</p>
                        </div>
                    )}

                    {profileData?.favoriteRide && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Favorite Disney Ride</p>
                            <p>{profileData.favoriteRide}</p>
                        </div>
                    )}

                    {profileData?.favoriteMovie && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Favorite Disney Movie</p>
                            <p>{profileData.favoriteMovie}</p>
                        </div>
                    )}

                    {profileData?.favoriteDisneyland && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Favorite Disneyland</p>
                            <p>{profileData.favoriteDisneyland}</p>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Button
                        variant="default"
                        className="w-fit bg-disneyBlue"
                        onClick={() => router.push('/profile/edit')}
                    >
                        Edit Profile
                    </Button>
                </div>
            </Card>
        </div>
    )
} 