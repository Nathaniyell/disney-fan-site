import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { User } from 'firebase/auth'
import Cookies from 'js-cookie'

export function useAuth() {
    const [user, setUser] = useState<User | null>(auth.currentUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)

            if (user) {
                // Set a cookie when user is logged in
                Cookies.set('auth', 'true', { expires: 7 })
            } else {
                // Remove cookie when user is logged out
                Cookies.remove('auth')
            }
        })

        return () => unsubscribe()
    }, [])

    return { user, loading }
} 