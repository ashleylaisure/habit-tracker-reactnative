import { Stack, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
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
