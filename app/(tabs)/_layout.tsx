import { Tabs, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

export default function TabsLayout() {
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user && !isLoading) {
            console.log("User not authenticated, redirecting to login...");
            router.replace("/auth");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        // Optionally, render a loading screen or nothing while checking auth status
        return null;
    }

    
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tabs.Screen name="index" options={{ 
                title: "Home",
                tabBarIcon: ({ color, focused }) => {
                    return focused ? (
                        <FontAwesome name="home" color={color} size={24} />
                    ) : (
                        <AntDesign name="home" size={24} color={color} />
                    )
                } 
            }} />
        </Tabs>
    );
}
