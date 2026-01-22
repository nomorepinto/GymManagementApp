import { View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ExerciseToday from 'components/exerciseToday';
import Button from 'components/button';

export default function App() {

    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <View className="flex-1 items-center font-nexa-light bg-primarybg">
                <Button text='Create Profile' onPress={() => router.navigate('/createProfile')} />
                <ExerciseToday exercise='Back Day' />
                <ExerciseToday exercise='Back Day' />
            </View>
        </KeyboardAvoidingView>
    );
}
