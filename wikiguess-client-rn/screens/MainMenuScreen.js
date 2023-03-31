import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainMenuScreen({ navigation }) {
    const [userText, setUserText] = useState();

    function playPressHandler() {
        navigation.navigate('GameScreen');
    }

    function logOutPressHandler() {
        AsyncStorage.removeItem('user');
        navigation.navigate('WelcomeScreen');
    }

    function statisticsPressHandler() {
        navigation.navigate('StatisticsScreen');
    }

    async function wikipediaPressHandler() {
        navigation.navigate('WikipediaScreen');
    }

    useEffect(() => {
        async function getUser() {
            let user = JSON.parse(await AsyncStorage.getItem('user'));
            setUserText(user.UserName);
        }
        getUser();
    }, []);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <PrimaryHeader>
                    <Text style={{ color: '#9a0000' }}>We</Text>
                    <Text style={{ color: '#2f9a69' }}>lc</Text>
                    <Text style={{ color: '#00649c' }}>om</Text>
                    <Text style={{ color: '#2f9a69' }}>e </Text>
                    {userText}
                </PrimaryHeader>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/wikimonsterHeroic.png')} style={styles.image} />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={playPressHandler}>
                            Play <Ionicons name='game-controller-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={statisticsPressHandler}>
                            Statistics <Ionicons name='stats-chart-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={wikipediaPressHandler}>
                            Wikipedia <Ionicons name='globe-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.footerContainer}>
                        <SecondaryButton onPress={logOutPressHandler}>Log out!</SecondaryButton>
                    </View>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 200,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 50,
    },
    buttonsContainer: {
        width: '80%',
        marginVertical: 20,
        marginTop: 10,
    },
    buttonContainer: {
        marginVertical: 8,
    },
    footerContainer: {
        height: '25%',
        paddingBottom: 30,
        justifyContent: 'flex-end',
    },
});
