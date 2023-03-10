import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';

export default function WelcomeScreen({ navigation }) {
    function logInHandler() {
        navigation.navigate('LogInScreen');
    }

    function signUpHandler() {
        navigation.navigate('SignUpScreen');
    }

    function howtoPlayPressHandler() {
        navigation.navigate('HowToPlayScreen');
    }

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <PrimaryHeader textStyle={styles.headerText}>
                    <Text style={{ color: '#9a0000' }}>Wik</Text>
                    <Text style={{ color: '#2f9a69' }}>iG</Text>
                    <Text style={{ color: '#00649c' }}>ue</Text>
                    <Text style={{ color: '#2f9a69' }}>ss</Text>
                </PrimaryHeader>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/Wikidata-logo.svg.png')} style={styles.image} />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={logInHandler}>Log In</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={signUpHandler}>Sing Up</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={howtoPlayPressHandler}>How to play</PrimaryButton>
                    </View>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 55,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 3,
        width: 300,
        height: 200,
        alignItems: 'center',
        margin: 36,
    },
    buttonsContainer: {
        flex: 4,
        marginHorizontal: 50,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginVertical: 8,
    },
});
