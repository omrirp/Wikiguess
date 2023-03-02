import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';

export default function MainMenuScreen({ navigation }) {
    function playPressHandler() {
        navigation.navigate('GameScreen');
    }

    function logOutPressHandler() {
        navigation.navigate('WelcomeScreen');
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    <Text style={{ color: '#9a0000' }}>We</Text>
                    <Text style={{ color: '#2f9a69' }}>lc</Text>
                    <Text style={{ color: '#00649c' }}>om</Text>
                    <Text style={{ color: '#2f9a69' }}>e </Text>
                    User!
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/Wikidata-logo.svg.png')} style={styles.image} />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={playPressHandler}>Play</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Statistics</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Share</PrimaryButton>
                </View>
                <View style={styles.footerContainer}>
                    <SecondaryButton onPress={logOutPressHandler}>Log out!</SecondaryButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 150,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    buttonsContainer: {
        width: '80%',
        marginVertical: 20,
        //borderWidth: 1,
        marginTop: 50,
    },
    buttonContainer: {
        marginVertical: 8,
    },
    footerContainer: {
        height: '40%',
        paddingBottom: 36,
        justifyContent: 'flex-end',
    },
});
