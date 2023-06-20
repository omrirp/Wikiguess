import { View, StyleSheet, unstable_enableLogBox } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
import { getAllCharacters } from '../utils/firebaseHandler';

const allKeys = [
    'academinDegree',
    'age',
    'countryOfCitizenship',
    'dateOfBirth',
    'ethnicGroup',
    'genderLabel',
    'itemLabel',
    'occupation',
    'residence',
    'dateOfDeath',
    'fieldOfWork',
    'genre',
    'eyeColor',
    'hairColor',
];

export default function GameScreen({ navigation, route }) {
    // Question counter
    const [questionNum, setQuestionNum] = useState(1);
    // Question text to render
    const [question, setQuestion] = useState('');
    // Data from WikiData
    const [data, setData] = useState(null);
    // The property to ask about
    const [key, setKey] = useState(null);
    // The value of the property to ask about
    const [value, setValue] = useState(null);
    // Last answer of the user
    const [lastAnswer, setLastAnswer] = useState('yes');
    // Questions limit before guessing
    const [limit, setLimit] = useState(6);
    // String that will contain SparQL code with properties to add
    const [queryAdds, setQueryAdds] = useState('');
    // String that will contain SparQL code with not properties to add
    const [queryNots, setQueryNots] = useState('');
    // Set this to true when query to WikiData API in the middle of the game
    const [isQueried, setIsQueried] = useState(false);
    // This object will contain the key/value pait of the questions that the user answers yes
    const [gameObject, setGameObject] = useState({});

    const [globalKeys, setGlobalKeys] = useState([]);

    // Decide what unique value to use for renderind the question
    function decision() {
        if (questionNum == limit) {
            setLimit((prevLimit) => prevLimit + 2);
            navigation.navigate('GuessScreen', {
                name: data[0].itemLabel,
                questionCount: questionNum,
                gameObject: gameObject,
            });
        }

        let probabilities = {};

        let keys = allKeys;

        // Iterating on every key (column) in the data
        keys.forEach((key) => {
            // Find the probabilities for each of the unique value in the data
            for (let i = 0; i < data.length; i++) {
                // Check if the key is an array of values is valid
                if (data[i][key]) {
                    let subs = data[i][key].split(', ');
                    // Calculate the probabilities of each unique value in the array
                    for (let j = 0; j < subs.length; j++) {
                        if (!probabilities[subs[j]]) {
                            let probability =
                                data.filter((o) => {
                                    try {
                                        let subsToCompare = o[key].split(', ');
                                        if (subsToCompare.includes(subs[j])) {
                                            return o;
                                        }
                                    } catch (error) {}
                                }).length / data.length;
                            probabilities[subs[j]] = { probability, key };
                        }
                    }
                }
            }
        });
        // Result for probabilities- {unique valeu: probability, ...}

        // Find the unique value that will be closest to cut the data to 50%
        // meaning |probability(value)-0.5| will give the minimum result
        let probKeys = Object.keys(probabilities);
        let toAsk;
        let cut = 1;
        probKeys.forEach((p) => {
            let calc = Math.abs(probabilities[p].probability - 0.5);
            if (cut > calc) {
                cut = calc;
                toAsk = [probabilities[p].key, p];
            }
        });
        // Result for toAsk- [name of the key, name of the unique value]
        return toAsk;
    }

    // Each "yes" answer store the key:value of the character in gameObject
    function gameObjectHandler() {
        setGameObject((prevGameObject) => {
            let ketStr = updateKeyFormat(key);
            if (!prevGameObject[ketStr]) {
                prevGameObject[ketStr] = value;
            } else {
                prevGameObject[ketStr] += ', ' + value;
            }
            return prevGameObject;
        });
    }

    function yesPressHandler() {
        // Hanlde gameObject
        gameObjectHandler();

        setData((prevData) => {
            try {
                let filteredData = prevData.filter((item) => {
                    if (!item[key]) {
                        return item;
                    }
                    let subs = item[key].split(', ');
                    for (let i = 0; i < subs.length; i++) {
                        if (subs.includes(value)) {
                            return item;
                        }
                    }
                });
                return filteredData;
            } catch (error) {
                navigation.navigate('GuessScreen', {
                    questionCount: questionNum,
                    gameObject: gameObject,
                });
            }
        });
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('yes');
        getPidAndQid(updateKeyFormat(key), value, 'yes');
    }

    function noPressHandler() {
        setData((prevData) => {
            try {
                let filteredData = prevData.filter((item) => {
                    if (!item[key]) {
                        return item;
                    }
                    let subs = item[key].split(', ');
                    for (let i = 0; i < subs.length; i++) {
                        if (!subs.includes(value)) {
                            return item;
                        }
                    }
                });
                return filteredData;
            } catch (error) {
                navigation.navigate('GuessScreen', {
                    questionCount: questionNum,
                    gameObject: gameObject,
                });
            }
        });
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('no');
        getPidAndQid(updateKeyFormat(key), value, 'no');
    }

    function dontKnowPressHandler() {
        setData((prevData) => {
            try {
                for (let i = 0; i < prevData.length; i++) {
                    if (prevData[i][key]) {
                        // Split the multi value key to substrings
                        let subs = prevData[i][key].split(', ');
                        // Filter the desired value
                        subs = subs.filter((s) => s != value);
                        // Set the new multi value key as a string to the object
                        prevData[i][key] = subs.join(', ');
                    }
                }
                return prevData;
            } catch (error) {
                navigation.navigate('GuessScreen', {
                    questionCount: questionNum,
                    gameObject: gameObject,
                });
            }
        });
        setQuestionNum((prev) => prev + 1);
        setLastAnswer("don't know");
    }

    async function getPidAndQid(propertyLabel, valueLabel, answer) {
        try {
            const propertyUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${propertyLabel}&format=json&language=en&type=property`;
            const valueUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${valueLabel}&format=json&language=en`;

            const propertyResponse = await fetch(propertyUrl);
            const propertyData = await propertyResponse.json();
            const pid = propertyData.search[0].id;

            const entityResponse = await fetch(valueUrl);
            const valueData = await entityResponse.json();
            const qid = valueData.search[0].id;

            if (answer == 'yes') {
                setQueryAdds((prevQuerry) => prevQuerry + `wdt:${pid} wd:${qid}; `);
            }
            if (answer == 'no') {
                setQueryNots((prevQuerry) => prevQuerry + `MINUS {?item wdt:${pid} wd:${qid} } `);
            }
        } catch (error) {
            console.log('invalid property or value: ' + propertyLabel + ': ' + valueLabel);
        }
    }

    function queryBuilder(additions = '', minuses = '') {
        const queryDispatcher = new SPARQLQueryDispatcher(additions, minuses);
        queryDispatcher.query().then((results) => {
            setData(results);
        });
    }

    async function fetchDataFromFirebase() {
        try {
            const dataFromFB = await getAllCharacters();
            setData(dataFromFB);
            // For some reason if the function returns the data the array of objects will be
            // inside of another object, right now this is the way to fetch the data witout issues

            // Generate global Keys
            let res = [];
            for (let i = 0; i < dataFromFB.length; i++) {
                let objKeys = Object.keys(dataFromFB[i]);
                objKeys.forEach((key) => {
                    if (!res.includes(key)) {
                        res.push(key);
                    }
                });
            }
            //await setGlobalKeys(res);
        } catch (error) {
            console.error(error);
        }
    }

    function updateKeyFormat(str) {
        // Erase the 'Label' string from the key
        str = str.replace('Label', '');
        // Replace all uppercase characters with space and lower case characters
        str = str.replace(/[A-Z]/g, (match) => ` ${match.toLowerCase()}`);
        return str;
    }

    useEffect(() => {
        //queryBuilder();
        fetchDataFromFirebase();
        //setData(tempQuery);
    }, []);

    // Delete all instances of a certain character that the app guessed wrong on GuessScreen
    // route.params.toDelete will contain the name of that character
    useEffect(() => {
        if (route.params) {
            setData((prevData) => prevData.filter((item) => item.itemLabel != route.params.toDelete));
            delete route.params;
        }
        // Need to send SparQl querry here !!!
    }, [route]);

    useEffect(() => {
        // Cannot run this useEffect function until the data is fetched
        if (!data) {
            return;
        }
        console.log(data.length);
        // Use this to get all keys hardcoded
        // let res = [];
        // for (let i = 0; i < data.length; i++) {
        //     let keys = Object.keys(data[i]);
        //     keys.forEach((key) => {
        //         if (!res.includes(key)) {
        //             res.push(key);
        //         }
        //     });
        // }
        // console.log(res);

        try {
            let [decidedKey, decidedValue] = decision();
            setKey(decidedKey);
            setValue(decidedValue);
            setQuestion("is your character's " + (key ? updateKeyFormat(key) : '') + ' is ' + value + '?');
        } catch (error) {
            // Catch block will run when data will be empty
            if (!isQueried) {
                //console.log(queryAdds);
                //console.log(queryNots);
                // Do not send the request for now...
                //queryBuilder(queryAdds, queryNots);
                setIsQueried(true);
            } else {
                navigation.navigate('GameOverScreen', {
                    result: 'incorrect',
                    questionCount: questionNum,
                    gameObject: gameObject,
                });
            }
        }
    }, [data, key, value, questionNum]);

    return (
        <GradientBackground>
            <View style={styles.rootContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar lastAnswer={lastAnswer} />
                </View>
                <View style={styles.questionContainer}>
                    <Question questionNum={questionNum} questionText={question} />
                </View>
                <View style={styles.buttunsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={yesPressHandler}>
                            Yes <Ionicons name='happy-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={noPressHandler}>
                            No <Ionicons name='sad-outline' size={20} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={dontKnowPressHandler}>Don't know...</PrimaryButton>
                    </View>
                </View>
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    avatarContainer: {
        flex: 1,
    },
    questionContainer: {
        flex: 1,
    },
    buttunsContainer: {
        flex: 1,
        marginHorizontal: 36,
    },
    buttonContainer: {
        marginTop: 6,
    },
});
