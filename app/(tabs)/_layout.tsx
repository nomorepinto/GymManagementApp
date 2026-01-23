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
                <Tabs>
                    <Tabs.Screen name="index" options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
                    <Tabs.Screen name="createProfile" options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
                </Tabs>
            ) : (
                <Tabs>
                    <Tabs.Screen name="createProfile" options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
                </Tabs>
            )}
            <StatusBar style="auto" />
        </>
    );
}