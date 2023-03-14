import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';

export default function MainMenuScreen({ navigation }) {
    function playPressHandler() {
        navigation.navigate('GameScreen');
    }

    function logOutPressHandler() {
        navigation.navigate('WelcomeScreen');
    }

    function statisticsPressHandler() {
        navigation.navigate('StatisticsScreen');
    }

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <PrimaryHeader>
                    <Text style={{ color: '#9a0000' }}>We</Text>
                    <Text style={{ color: '#2f9a69' }}>lc</Text>
                    <Text style={{ color: '#00649c' }}>om</Text>
                    <Text style={{ color: '#2f9a69' }}>e </Text>
                    User!
                </PrimaryHeader>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/Wikidata-logo.svg.png')} style={styles.image} />
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
                        <PrimaryButton>
                            Share <Ionicons name='share-social-outline' size={20} />
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
