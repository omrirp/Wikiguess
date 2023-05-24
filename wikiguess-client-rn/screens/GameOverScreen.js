import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';

export default function GameOverScreen({ route, navigation }) {
    const [image, setImage] = useState(<Text>Loading...</Text>);
    const [results, setResults] = useState(<Text>Loading...</Text>);
    const [userEmail, setUserEmail] = useState('');
    const [inputText, setInputText] = useState('');
    const [searchedCharacter, setSearchedCharacter] = useState('');

    function endGamePressHandler() {
        const stat = {
            UserEmail: userEmail,
            QuestionCount: route.params.questionCount,
            isCorrect: route.params.result == 'correct',
            Character: route.params.character ? route.params.character : '',
        };
        console.log(stat);
        axios.post('http://proj.ruppin.ac.il/cgroup8/prod/api/playersgames/stats', stat).catch((error) => {
            console.log(error);
        });
        navigation.navigate('MainMenuScreen');
    }

    function searchHandler() {
        // clear search output
        setSearchedCharacter('');
        axios
            .get(
                `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts|pageimages&exintro&explaintext&piprop=original&redirects=1&titles=${inputText}`
            )
            .then((res) => {
                const keys = Object.keys(res.data.query.pages);
                //res.data.query.pages[keys[0]].title
                if (!res.data.query.pages[keys[0]].extract) {
                    setSearchedCharacter(<Text style={styles.characterText}>{'Please Ceck your spelling...'}</Text>);
                } else {
                    let characterName = res.data.query.pages[keys[0]].title;
                    setSearchedCharacter(
                        <>
                            <View style={styles.characterContainer}>
                                <View style={{ flex: 4 }}>
                                    <Text style={styles.characterText}>{characterName}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PrimaryButton onPress={sentCharacterHandler.bind(this, characterName)}>
                                        <Ionicons name='checkmark-outline' size={20} />
                                    </PrimaryButton>
                                </View>
                            </View>
                        </>
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function sentCharacterHandler(characterName) {
        console.log(characterName);
        // Need to send to DB
    }

    function inputTextHandler(enteredText) {
        setInputText(enteredText);
    }

    const search = (
        <View style={styles.searchContainer}>
            <View style={styles.textIputContainer}>
                <PrimaryTextInput placeholder={'Character Search'} onChangeText={inputTextHandler} value={inputText} />
            </View>
            <View style={styles.searchButtonContainer}>
                <PrimaryButton onPress={searchHandler.bind()}>
                    <Ionicons name='search-outline' size={20} />
                </PrimaryButton>
            </View>
        </View>
    );

    useEffect(() => {
        let gameObject = route.params.gameObject;

        async function getUserEmail() {
            let user = JSON.parse(await AsyncStorage.getItem('user'));
            setUserEmail(user.UserEmail);
        }
        getUserEmail();

        switch (route.params.result) {
            case 'correct': {
                setImage(<Image source={require('../assets/images/wikimonsterHappy.png')} style={styles.image} />);
                setResults(<Text style={styles.text}>Congratulations!</Text>);
                break;
            }
            case 'incorrect': {
                setImage(<Image source={require('../assets/images/wikimonsterSad.png')} style={styles.image} />);
                // In case the program could not guess the users character,
                // render this JSX code to ask the user about his thinking
                setResults(
                    <>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>I'm sorry. Can you please tell me who you were thinking of?</Text>
                        {search}
                        {searchedCharacter}
                    </>
                );
                break;
            }
            default:
                break;
        }
    }, [inputText, searchedCharacter]);

    return (
        <GradientBackground>
            <ScrollView>
                <View style={styles.rootContainer}>
                    <View style={styles.ImageContainer}>{image}</View>
                    <View style={styles.resultContainer}>{results}</View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={endGamePressHandler}>
                            End Game <Ionicons name='trophy-outline' size={20} />
                        </PrimaryButton>
                    </View>
                </View>
            </ScrollView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        //flex: 1,
        margin: 8,
    },
    ImageContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#de7c7c',
        // borderWidth: 1,
    },
    image: {
        height: '100%',
        width: 400,
    },
    buttonContainer: {
        marginVertical: 20,
        marginHorizontal: 36,
    },
    resultContainer: {
        //alignItems: 'center',
        width: '100%',
        marginVertical: 100,
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
    },
    textIputContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    searchButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    characterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    characterText: {
        fontSize: 30,
        textAlign: 'center',
    },
});
