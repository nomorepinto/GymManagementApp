import "../global.css"; // Import your Tailwind/NativeWind styles
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'nexa-light': require('assets/fonts/Nexa-ExtraLight.ttf'),
        'nexa-heavy': require('assets/fonts/Nexa-Heavy.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <StatusBar style="auto" />
        </Stack>
    );
}