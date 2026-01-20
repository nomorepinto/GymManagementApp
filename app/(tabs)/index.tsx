import CreateProfile from 'components/createProfile';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <View className="flex-1 font-nexa-light bg-primarybg">
                <CreateProfile />
            </View>
        </KeyboardAvoidingView>
    );
}
