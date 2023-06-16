import { View, Text, StyleSheet, Image } from 'react-native';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';

export default function HowToPlayScreen() {
    return (
        <GradientBackground>
            <PrimaryHeader textStyle={styles.headerText}>How to play</PrimaryHeader>
            <View style={styles.instructionsContainer}>
                <Text style={styles.text}>
                    <Text style={{ color: '#9a0000' }}>
                        {'\u25cf Think abount any character with Wikipedia page. \n'}
                    </Text>
                    <Text style={{ color: '#2f9a69' }}>{"\u25cf Answer yes/no/don't know question. \n"}</Text>
                    <Text style={{ color: '#00649c' }}>{'\u25cf I will try to guess who you thought about. \n'}</Text>
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/wikimonsterThinking.png')} style={styles.image} />
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    instructionsContainer: {
        margin: 16,
    },
    text: {
        fontSize: 20,
        lineHeight: 35,
        fontFamily: 'Fredoka-Regular',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerText: {
        fontFamily: 'Fredoka-SemiBold',
    },
});
