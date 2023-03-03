import { View, Text, StyleSheet } from 'react-native';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';

export default function HowToPlayScreen() {
    return (
        <GradientBackground>
            <PrimaryHeader>How to play</PrimaryHeader>
            <View style={styles.instructionsContainer}>
                <Text style={styles.text}>
                    {'\u25cf Think abount any character with Wikipedia Page. \n'}
                    {"\u25cf Answer yes/no/don't know question. \n"}
                    {'\u25cf We will try to guess who you thought about. \n'}
                </Text>
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
    },
});
