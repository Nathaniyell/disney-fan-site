"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Loader2 } from "lucide-react"
import Image from "next/image"

interface AuthFormProps {
    mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Add your authentication logic here
        setIsLoading(false)
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold">
                    {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="text-gray-500 mt-2">
                    {mode === 'login'
                        ? 'Enter your details to sign in'
                        : 'Enter your details to get started'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={() => { }}>
                    <Image
                        src="/google.svg"
                        alt="Google"
                        width={16}
                        height={16}
                        className="mr-2"
                    />
                    Google
                </Button>
                <Button variant="outline" className="w-full" onClick={() => { }}>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                </Button>
            </div>

            <p className="text-center text-sm text-gray-500">
                {mode === 'login' ? (
                    <>
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </>
                )}
            </p>
        </div>
    )
} 