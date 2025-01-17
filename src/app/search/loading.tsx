import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-gray-500">Loading results...</p>
            </div>
        </div>
    )
} 