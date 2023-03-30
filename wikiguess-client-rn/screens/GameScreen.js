import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
const miniData = [
    { name: 'avi', age: 28, grade: 90, gender: 'male' },
    { name: 'dani', age: 25, grade: 90, gender: 'male' },
    { name: 'benny', age: 27, grade: 87, gender: 'male' },
    { name: 'shmulik', age: 26, grade: 74, gender: 'male' },
    { name: 'rivka', age: 25, grade: 70, gender: 'female' },
    { name: 'mazal', age: 28, grade: 95, gender: 'female' },
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
    // String that will contain SparQL code to send directly yo WikiData API
    const [querry, setQuerry] = useState('');

    // Decide what unique value to use for renderind the question
    function decision() {
        if (questionNum == limit) {
            setLimit((prevLimit) => prevLimit + 2);
            navigation.navigate('GuessScreen', { name: data[0].itemLabel, imageUrl: data[0].imageLabel });
        }

        let probabilities = {};
        // Asumeing all object have the same attributes
        let keys = Object.keys(data[0]);
        keys = keys.filter((key) => key != 'itemLabel' && key != 'item' && key != 'articles' && key != 'imageLabel');
        // Iterating on every key (column) in the data
        keys.forEach((key) => {
            // Find the probabilities for each of the unique value in the data
            for (let i = 0; i < data.length; i++) {
                if (!probabilities[data[i][key]] && data[i][key]) {
                    let probability = data.filter((o) => o[key] == data[i][key]).length / data.length;
                    probabilities[data[i][key]] = { probability, key };
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

    function yesPressHandler() {
        setData((prevData) => prevData.filter((item) => item[key] == value));
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('yes');
        getPidAndQid(key.replace('Label', ''), value, 'yes');
    }

    function noPressHandler() {
        setData((prevData) => prevData.filter((item) => item[key] != value));
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('no');
        getPidAndQid(key.replace('Label', ''), value, 'no');
    }

    function dontKnowPressHandler() {
        setData((prevData) => {
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i][key] == value) {
                    prevData[i][key] = null;
                }
            }
            return prevData;
        });
        setQuestionNum((prev) => prev + 1);
        setLastAnswer("don't know");
    }

    async function getPidAndQid(propertyLabel, valueLabel, answer) {
        const propertyUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${propertyLabel}&format=json&language=en&type=property`;
        const valueUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${valueLabel}&format=json&language=en`;

        const propertyResponse = await fetch(propertyUrl);
        const propertyData = await propertyResponse.json();
        const pid = propertyData.search[0].id;

        const entityResponse = await fetch(valueUrl);
        const valueData = await entityResponse.json();
        const qid = valueData.search[0].id;

        //return [pid, qid];
        if (answer == 'yes') {
            setQuerry((prevQuerry) => prevQuerry + `wdt:${pid} wd:${qid}; . `);
        }
        if (answer == 'no') {
            setQuerry((prevQuerry) => prevQuerry + `FILTER NOT EXISTS { wdt:${pid} wd:${qid} } .`);
        }
    }

    function queryBuilder(additions = '') {
        const queryDispatcher = new SPARQLQueryDispatcher(additions);
        queryDispatcher.query().then((results) => setData(results));
    }

    useEffect(() => {
        queryBuilder();
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

        try {
            let [decidedKey, decidedValue] = decision();
            setKey(decidedKey);
            setValue(decidedValue);
            setQuestion("is you character's " + (key ? key.replace('Label', '') : '') + ' is ' + value + '?');
        } catch (error) {
            // Catch block will run when data will be empty
            navigation.navigate('MainMenuScreen');
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
