import CreateProfile from 'components/createProfile';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import './global.css';

SplashScreen.preventAutoHideAsync();

export default function App() {

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 font-nexa-light bg-primarybg">
        <CreateProfile />
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}
