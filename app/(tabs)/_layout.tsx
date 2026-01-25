import { Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react'


export default function TabLayout() {

    const doesProfileArrayExist = async () => {
        try {
            const existingData = await AsyncStorage.getItem('profileDataArray');
            if (existingData) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const [profileArrayExists, setProfileArrayExists] = useState<boolean>(false);

    useEffect(() => {
        const checkProfileArrayExists = async () => {
            const exists = await doesProfileArrayExist();
            setProfileArrayExists(exists);
        };
        checkProfileArrayExists();
    }, []);



    return (
        <>
            {profileArrayExists ? (
                <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }} >
                    <Tabs.Screen name="index" />
                    <Tabs.Screen name="createProfile" />
                </Tabs>
            ) : (
                <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }} >
                    <Tabs.Screen name="createProfile" />
                </Tabs>
            )}
            <StatusBar style="auto" />
        </>
    );
}