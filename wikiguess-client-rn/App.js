import { StatusBar } from 'expo-status-bar';
import { createContext } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import GuessScreen from './screens/GuessScreen';
import GameOverScreen from './screens/GameOverScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';
import StatisticsScreen from './screens/StatisticsScreen';

const Stack = createNativeStackNavigator();
const userContext = createContext()

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='WelcomeScreen'
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#737373',
                        },
                        headerTintColor: 'white',
                    }}
                >
                    <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
                    <Stack.Screen name='LogInScreen' component={LogInScreen} />
                    <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                    <Stack.Screen name='MainMenuScreen' component={MainMenuScreen} options={{ headerLeft: () => <Text></Text> }} />
                    <Stack.Screen name='GameScreen' component={GameScreen} />
                    <Stack.Screen name='GuessScreen' component={GuessScreen} options={{ headerLeft: () => <Text></Text> }} />
                    <Stack.Screen name='GameOverScreen' component={GameOverScreen} options={{ headerLeft: () => <Text></Text> }} />
                    <Stack.Screen name='HowToPlayScreen' component={HowToPlayScreen} />
                    <Stack.Screen name='StatisticsScreen' component={StatisticsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
