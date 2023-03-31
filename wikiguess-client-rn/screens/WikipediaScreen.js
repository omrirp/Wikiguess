import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import { Ionicons } from '@expo/vector-icons';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import axios from 'axios';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function WikipediaScreen() {
    const [inputText, setInputText] = useState('');
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');

    function inputTextHandler(enteredText) {
        setInputText(enteredText);
    }

    function onSearchPress() {
        axios
            .get(
                `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${inputText}`
            )
            .then((res) => {
                const keys = Object.keys(res.data.query.pages);
                setHeader(res.data.query.pages[keys[0]].title);
                if (!res.data.query.pages[keys[0]].extract) {
                    setContent('Please Ceck your spelling about ' + res.data.query.pages[keys[0]].title);
                } else {
                    setContent(res.data.query.pages[keys[0]].extract);
                }
                // data = res.data;
                // console.log(data.query.pages);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <GradientBackground>
            <ScrollView style={styles.container}>
                <View style={styles.inputesContainer}>
                    {/* <View style={styles.imageContainer}>
                        <Image source={require('../assets/images/WikipediaLogo.svg.png')} style={styles.image} />
                    </View> */}
                    <View style={styles.inputContainer}>
                        <PrimaryTextInput placeholder={'Wikipedia Search'} onChangeText={inputTextHandler} />
                    </View>
                    <View style={styles.buttoncontainer}>
                        <PrimaryButton onPress={onSearchPress}>
                            <Ionicons name='search-outline' size={20} />
                        </PrimaryButton>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <PrimaryHeader>{header}</PrimaryHeader>
                    <Text>{content}</Text>
                </View>
            </ScrollView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    inputesContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    inputContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    buttoncontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        width: 55,
        height: 50,
        marginRight: 2,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        marginHorizontal: 8,
    },
});
