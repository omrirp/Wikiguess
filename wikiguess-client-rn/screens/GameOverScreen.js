import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';

export default function GameOverScreen({ route, navigation }) {
    const [image, setImage] = useState(<Text>Loading...</Text>);
    const [textResult, setTextResult] = useState('Loading...');

    useEffect(() => {
        switch (route.params.result) {
            case 'correct': {
                setImage(<Image source={require('../assets/images/happy.png')} style={styles.image} />);
                setTextResult('Congratulations!');
                break;
            }
            case 'incorrect': {
                setImage(<Image source={require('../assets/images/sad.png')} style={styles.image} />);
                setTextResult('Better luck next time...');
                break;
            }
            default:
                break;
        }
    }, []);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <View style={styles.ImageContainer}>{image}</View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{textResult}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => navigation.navigate('MainMenuScreen')}>
                        Eng Game <Ionicons name='trophy-outline' size={20} />
                    </PrimaryButton>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        margin: 8,
    },
    ImageContainer: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#de7c7c',
        // borderWidth: 1,
    },
    image: {
        height: '95%',
        width: 280,
    },
    buttonContainer: {
        marginVertical: 50,
        marginHorizontal: 36,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 30,
    },
});
