import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GuessScreen({ route, navigation }) {
    const [image, setImage] = useState(<Text>Loading...</Text>);

    useEffect(() => {
        // Need to fetch real Image from Wikipedia...
        setImage(<Image source={require('../assets/images/tempCharectar.png')} style={styles.image} />);
    }, []);

    return (
        <View style={styles.rootContainer}>
            <View style={styles.ImageContainer}>{image}</View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Is you'r charectar {route.params.name}?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onPress={() => {
                            navigation.navigate('GameOverScreen', { result: 'correct' });
                        }}
                    >
                        Yes
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        onPress={() => {
                            navigation.navigate('GameScreen');
                        }}
                    >
                        No
                    </PrimaryButton>
                </View>
            </View>
        </View>
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
    textContainer: {
        height: 150,
        justifyContent: 'center',
        // backgroundColor: '#dbdb82',
        // borderWidth: 1,
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 1,
        marginHorizontal: 36,
        // backgroundColor: '#73a2d9',
        // borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 6,
    },
    image: {
        height: '95%',
        width: 280,
    },
});