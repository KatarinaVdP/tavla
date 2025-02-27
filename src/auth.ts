import { useState, useEffect, useContext, createContext } from 'react'

import type { User } from 'firebase/auth'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

import { auth } from './firebase-init'

/**
 * If user is undefined, we don't know yet if user is logged in.
 * If user is null, we know there's not a logged in user
 * If user is User, we have a logged-in or anonymous user.
 */
export function useFirebaseAuthentication(): User | null | undefined {
    const [user, setUser] = useState<User | null | undefined>()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser)
            if (newUser) {
                return
            }
            // eslint-disable-next-line no-console
            signInAnonymously(auth).catch(console.error)
        })

        return unsubscribe
    }, [])

    return user
}

const UserContext = createContext<User | null | undefined>(null)

export const UserProvider = UserContext.Provider

export function useUser(): User | null | undefined {
    return useContext(UserContext)
}
export { auth }
