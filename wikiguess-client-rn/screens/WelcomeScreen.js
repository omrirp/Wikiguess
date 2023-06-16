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
                <PrimaryHeader textStyle={styles.headerText} viewStyle={styles.headerView}>
                    <Text style={{ color: '#9a0000' }}>Wik</Text>
                    <Text style={{ color: '#2f9a69' }}>iG</Text>
                    <Text style={{ color: '#00649c' }}>ue</Text>
                    <Text style={{ color: '#2f9a69' }}>ss</Text>
                </PrimaryHeader>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/wikimonsterHeroic.png')} style={styles.image} />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={logInHandler}>Log In</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={signUpHandler}>Sign Up</PrimaryButton>
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
        alignItems: 'center',
    },
    headerText: {
        fontSize: 55,
        fontFamily: 'Fredoka-SemiBold',
    },
    headerView: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 4,
        width: 350,
        height: 250,
        alignItems: 'center',
    },
    buttonsContainer: {
        flex: 3,
        marginHorizontal: 50,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginVertical: 8,
        width: 250,
    },
});
