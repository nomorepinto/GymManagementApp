import { Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
    return (
        <>
            <Tabs screenOptions={{
                animation: 'shift',
                transitionSpec: {
                    animation: 'timing',
                    config: { duration: 100 },
                },
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}>
                <Tabs.Screen name="index" />
                <Tabs.Screen name="createProfile" />
                <Tabs.Screen name="error" />
                <Tabs.Screen name="workoutScreen" />
            </Tabs>
            <StatusBar style="auto" />
        </>
    );
}