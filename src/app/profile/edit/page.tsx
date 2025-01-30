"use client";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';


interface ProfileData {
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
    state: string;
    favoriteCharacter: string;
    favoriteMovie: string;
    favoriteRide: string;
    favoriteDisneyland: string;
}

export default function EditProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ProfileData>({
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        state: '',
        favoriteCharacter: '',
        favoriteMovie: '',
        favoriteRide: '',
        favoriteDisneyland: ''
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!user) {
        router.push('/login');
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);

            await setDoc(userRef, {
                ...formData,
                updatedAt: new Date().toISOString(),
            }, { merge: true });

            toast({
                title: "Profile updated successfully!",
                variant: "success",
            });

            router.push('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Failed to update profile",
                description: "Please try again later",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium">
                                First Name *
                            </label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium">
                                Last Name *
                            </label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="birthDate" className="block text-sm font-medium">
                            Birth Date *
                        </label>
                        <Input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="city" className="block text-sm font-medium">
                                City
                            </label>
                            <Input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="state" className="block text-sm font-medium">
                                State
                            </label>
                            <Select
                                value={formData.state}
                                onValueChange={(value) => handleSelectChange(value, 'state')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CA">California</SelectItem>
                                    <SelectItem value="FL">Florida</SelectItem>
                                    <SelectItem value="NY">New York</SelectItem>
                                    {/* Add more states as needed */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="favoriteCharacter" className="block text-sm font-medium">
                            Favorite Disney Character
                        </label>
                        <Input
                            id="favoriteCharacter"
                            name="favoriteCharacter"
                            value={formData.favoriteCharacter}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="favoriteMovie" className="block text-sm font-medium">
                            Favorite Disney Movie
                        </label>
                        <Input
                            id="favoriteMovie"
                            name="favoriteMovie"
                            value={formData.favoriteMovie}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="favoriteRide" className="block text-sm font-medium">
                            Favorite Disney Ride
                        </label>
                        <Input
                            id="favoriteRide"
                            name="favoriteRide"
                            value={formData.favoriteRide}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="favoriteDisneyland" className="block text-sm font-medium">
                            Favorite Disneyland
                        </label>
                        <Select
                            value={formData.favoriteDisneyland}
                            onValueChange={(value) => handleSelectChange(value, 'favoriteDisneyland')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Disneyland" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Disney World, Florida">Disney World, Florida</SelectItem>
                                <SelectItem value="Disneyland, California">Disneyland, California</SelectItem>
                                <SelectItem value="Disneyland Paris">Disneyland Paris</SelectItem>
                                <SelectItem value="Tokyo Disneyland">Tokyo Disneyland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            className="bg-disneyBlue"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Profile
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/profile')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
} 