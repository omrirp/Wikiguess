import { StatusBar } from 'expo-status-bar';
import { Text, Image, StyleSheet, View } from 'react-native';
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
import WikipediaScreen from './screens/WikipediaScreen';
import axios from 'axios';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'nasalization-rg': require('./assets/fonts/nasalization-rg.ttf'),
        'happymonkey-regular': require('./assets/fonts/HappyMonkey-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    // Wakeing up Node.JS server in Render.com
    axios.get('https://wikiguess-node-server.onrender.com/wakeup');

    const wikiDataImg = (
        <View style={styles.imageContainer}>
            <Image source={require('./assets/images/Wikidata-logo.svg.png')} style={styles.image} />
        </View>
    );

    const WikipediaImg = (
        <View style={styles.imageContainer}>
            <Image source={require('./assets/images/WikipediaLogo.svg.png')} style={styles.image} />
        </View>
    );

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
                        headerRight: () => wikiDataImg,
                    }}
                >
                    <Stack.Screen
                        name='WelcomeScreen'
                        component={WelcomeScreen}
                        options={{
                            title: 'Welcome',
                        }}
                    />
                    <Stack.Screen
                        name='LogInScreen'
                        component={LogInScreen}
                        options={{
                            title: 'Log in',
                        }}
                    />
                    <Stack.Screen
                        name='SignUpScreen'
                        component={SignUpScreen}
                        options={{
                            title: 'Sign up',
                        }}
                    />
                    <Stack.Screen
                        name='MainMenuScreen'
                        component={MainMenuScreen}
                        options={{
                            title: 'Main menu',
                            headerLeft: () => <Text></Text>,
                        }}
                    />
                    <Stack.Screen
                        name='GameScreen'
                        component={GameScreen}
                        options={{
                            title: 'Game',
                        }}
                    />
                    <Stack.Screen
                        name='GuessScreen'
                        component={GuessScreen}
                        options={{
                            title: '',
                            headerLeft: () => <Text></Text>,
                        }}
                    />
                    <Stack.Screen
                        name='GameOverScreen'
                        component={GameOverScreen}
                        options={{
                            title: 'Game Over',
                            headerLeft: () => <Text></Text>,
                        }}
                    />
                    <Stack.Screen
                        name='HowToPlayScreen'
                        component={HowToPlayScreen}
                        options={{
                            title: '',
                        }}
                    />
                    <Stack.Screen
                        name='StatisticsScreen'
                        component={StatisticsScreen}
                        options={{
                            title: 'Statistics',
                        }}
                    />
                    <Stack.Screen
                        name='WikipediaScreen'
                        component={WikipediaScreen}
                        options={{
                            title: 'Wikipedia',
                            headerRight: () => WikipediaImg,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 55,
        height: 50,
        marginRight: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontFamily: 'Arial', // Replace 'Arial' with the desired font family
    },
});
