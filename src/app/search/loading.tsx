import { Loading } from "@/components/ui/loading"

export default function SearchLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Loading message="Searching for characters..." />
        </div>
    )
} 