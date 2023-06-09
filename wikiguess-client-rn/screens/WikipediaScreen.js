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
    const [image, setImage] = useState('');

    function inputTextHandler(enteredText) {
        setInputText(enteredText);
    }

    function onSearchPress() {
        axios
            .get(
                `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts|pageimages&exintro&explaintext&piprop=original&redirects=1&titles=${inputText}`
            )
            .then((res) => {
                const keys = Object.keys(res.data.query.pages);
                setHeader(res.data.query.pages[keys[0]].title);
                if (!res.data.query.pages[keys[0]].original) {
                    setContent('Could not find a Wikipedia article. Please try inserting full name or check misspells.');
                    setImage('');
                } else {
                    setContent(res.data.query.pages[keys[0]].extract);
                    setImage(
                        <Image
                            source={{
                                uri: res.data.query.pages[keys[0]].original.source,
                            }}
                            style={styles.image}
                        />
                    );
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
                    <View style={styles.ImageContainer}>{image}</View>
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
    ImageContainer: {
        height: 200,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    infoContainer: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
});
