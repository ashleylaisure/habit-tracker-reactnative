import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        getUser();
    }, []);

    const signUp = async (email: string, password: string) => {
        try {
            await account.create({
                userId: ID.unique(),
                email,
                password,
            });
            await signIn(email, password);
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign-up.";
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const session = await account.get();
            setUser(session);
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign-in.";
        }
    }

    const signOut = async () => {
        try {
            await account.deleteSession({ sessionId: "current" });
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider value={{user, isLoading, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}