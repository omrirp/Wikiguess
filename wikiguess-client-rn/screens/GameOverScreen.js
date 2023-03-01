import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';

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
        <View style={styles.rootContainer}>
            <View style={styles.ImageContainer}>{image}</View>
            <View>
                <Text>{textResult}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={() => navigation.navigate('MainMenuScreen')}>Eng Game</PrimaryButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
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
        margin: 36,
    },
});
