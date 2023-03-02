import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import WelcomeScreen from './screens/WelcomeScreen';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import GuessScreen from './screens/GuessScreen';
import GameOverScreen from './screens/GameOverScreen';
import HowToPlayScreen from './screens/HowToPlayScreen';

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
                    <Stack.Screen
                        name='MainMenuScreen'
                        component={MainMenuScreen}
                        options={{ headerLeft: () => <Text></Text> }}
                    />
                    <Stack.Screen name='GameScreen' component={GameScreen} />
                    <Stack.Screen
                        name='GuessScreen'
                        component={GuessScreen}
                        options={{ headerLeft: () => <Text></Text> }}
                    />
                    <Stack.Screen
                        name='GameOverScreen'
                        component={GameOverScreen}
                        options={{ headerLeft: () => <Text></Text> }}
                    />
                    <Stack.Screen name='HowToPlayScreen' component={HowToPlayScreen} />
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
