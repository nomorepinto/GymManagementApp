import { Stack, Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <Tabs>
                <Tabs.Screen name="index" options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
                <Tabs.Screen name="createProfile" options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            </Tabs>
            <StatusBar style="auto" />
        </>
    );
}