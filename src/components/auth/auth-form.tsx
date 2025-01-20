/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Loader2 } from "lucide-react"
import Image from "next/image"
import { Card } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { useRouter } from "next/navigation"



interface AuthFormProps {
    mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(mode === 'login' ? loginSchema : signupSchema),
    })

    const onSubmit = async (data: LoginInput | SignupInput) => {
        setIsLoading(true)
        try {
            if (mode === "login") {
              await signInWithEmailAndPassword(auth, data.email, data.password);
            } else {
              await createUserWithEmailAndPassword(auth, data.email, data.password);
            }
            alert("Authentication successful!");
            router.push("/");
         }catch (error: any) {
            console.error(error.message);
            alert("Authentication failed: " + error.message);
          } finally {
            setIsLoading(false);
          }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setIsLoading(true);
        try {
          await signInWithPopup(auth, provider);
          alert("Google login successful!");
        } catch (error: any) {
          console.error(error.message);
          alert("Google login failed: " + error.message);
        } finally {
          setIsLoading(false);
        }
      };

    return (
        <Card className="w-full max-w-md mx-auto p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold">
                    {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="text-slate-500 mt-2">
                    {mode === 'login'
                        ? 'Enter your details to sign in'
                        : 'Enter your details to get started'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {mode === 'signup' && (
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <Input
                            id="name"
                            {...register('name')}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                )}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                        aria-invalid={!!errors.password}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full bg-disneyBlue"
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
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
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

            <p className="text-center text-sm text-slate-500">
                {mode === 'login' ? (
                    <>
                        Don&apos;t have an account?{' '}
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
        </Card>
    )
} 