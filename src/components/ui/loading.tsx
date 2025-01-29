import { Loader2 } from "lucide-react"

interface LoadingProps {
    message?: string;
    className?: string;
}

export function Loading({ message = "Loading...", className = "" }: LoadingProps) {
    return (
        <div className={`w-full flex flex-col items-center justify-center min-h-[400px] ${className}`}>
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-600" />
            <p className="text-gray-500 font-medium">{message}</p>
        </div>
    )
} 