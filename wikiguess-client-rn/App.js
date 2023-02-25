import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <>
            <StatusBar style='auto' />
            <NavigationContainer>
                <Stack.Navigator initialRouteName='WelcomeScreen'>
                    <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
                    <Stack.Screen name='LogInScreen' component={LogInScreen} />
                    <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                    <Stack.Screen name='MainMenuScreen' component={MainMenuScreen} />
                    <Stack.Screen name='GameScreen' component={GameScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
