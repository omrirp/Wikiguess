import { View, Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GuessScreen({ route, navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null, // This will hide the built-in back button
        });
    }, []);

    return (
        <View style={styles.rootContainer}>
            <View style={styles.ImageContainer}>
                <View
                    style={{
                        backgroundColor: '#06a016',
                        width: 200,
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>IMAGE</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Is you'r charectar {route.params.name}?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Yes</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>No</PrimaryButton>
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
        backgroundColor: '#de7c7c',
        borderWidth: 1,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: '#dbdb82',
        height: 150,
        borderWidth: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 1,
        marginHorizontal: 36,
        backgroundColor: '#73a2d9',
        borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 6,
    },
});
