import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';

export default function GuessScreen({ route, navigation }) {
    const [image, setImage] = useState(<Text>Loading...</Text>);

    useEffect(() => {
        // Need to fetch real Image from Wikipedia...
        setImage(
            <Image
                source={{
                    uri: route.params.imageUrl.replace('http', 'https'),
                }}
                style={styles.image}
            />
        );
    }, []);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <View style={styles.ImageContainer}>{image}</View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Thinking about {route.params.name}?</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => {
                                navigation.navigate('GameOverScreen', { result: 'correct' });
                            }}
                        >
                            Yes <Ionicons name='happy-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => {
                                navigation.navigate('GameScreen', { toDelete: route.params.name });
                            }}
                        >
                            No <Ionicons name='sad-outline' size={20} />
                        </PrimaryButton>
                    </View>
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
        borderRadius: 10,
    },
});
