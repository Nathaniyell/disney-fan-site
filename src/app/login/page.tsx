import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
    return (
        <main className="container mx-auto px-4 py-16">
            <AuthForm mode="login" />
        </main>
    )
} 