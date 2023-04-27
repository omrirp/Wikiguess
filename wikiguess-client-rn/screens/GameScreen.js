import { View, StyleSheet, unstable_enableLogBox } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
const miniData = [
    {
        item: 'http://www.wikidata.org/entity/Q43723',
        itemLabel: 'Benjamin Netanyahu',
        genderLabel: 'male',
        occupation: 'politician, diplomat, political scientist, political writer',
        country: 'Israel',
        articles: '140',
        dateOfBirth: '1949-10-21T00:00:00Z',
        residence: 'Jerusalem, Caesarea, Beit Aghion',
        age: '74',
    },
    {
        item: 'http://www.wikidata.org/entity/Q42992',
        itemLabel: 'Golda Meir',
        genderLabel: 'female',
        occupation: 'politician, teacher',
        country: 'Israel, United States of America',
        death: '1978-12-08T00:00:00Z',
        articles: '120',
        dateOfBirth: '1898-05-03T00:00:00Z',
        residence: 'United States of America, Moscow, Jerusalem',
        dateOfDeath: '1978-12-08T00:00:00Z',
        deathAge: '80',
        age: '125',
    },
    {
        item: 'http://www.wikidata.org/entity/Q39318',
        itemLabel: 'Naftali Bennett',
        genderLabel: 'male',
        occupation: 'businessperson, politician',
        country: 'Israel',
        articles: '84',
        dateOfBirth: '1972-03-25T00:00:00Z',
        residence: "Ra'anana",
        age: '51',
    },
    {
        item: 'http://www.wikidata.org/entity/Q1396120',
        itemLabel: 'Yair Lapid',
        genderLabel: 'male',
        occupation: 'actor, writer, politician, television presenter',
        country: 'Israel',
        articles: '64',
        dateOfBirth: '1963-11-05T00:00:00Z',
        residence: 'Tel Aviv',
        age: '60',
    },
    {
        item: 'http://www.wikidata.org/entity/Q983258',
        itemLabel: 'Isaac Herzog',
        genderLabel: 'male',
        occupation: 'lawyer, politician, advocate',
        country: 'Israel',
        articles: '62',
        dateOfBirth: '1960-09-22T00:00:00Z',
        residence: 'Tel Aviv',
        age: '63',
    },
    {
        item: 'http://www.wikidata.org/entity/Q151796',
        itemLabel: 'Tzipi Livni',
        genderLabel: 'female',
        occupation: 'lawyer, politician, diplomat, advocate, chief executive officer',
        country: 'Israel',
        articles: '62',
        dateOfBirth: '1958-07-08T00:00:00Z',
        residence: 'Tel Aviv',
        age: '65',
    },
    {
        item: 'http://www.wikidata.org/entity/Q171428',
        itemLabel: 'Roman Abramovich',
        genderLabel: 'male',
        occupation: 'politician, entrepreneur',
        country: 'Portugal, Russia, Israel, Soviet Union',
        articles: '60',
        dateOfBirth: '1966-10-24T00:00:00Z',
        residence: 'London, Moscow',
        age: '57',
    },
    {
        item: 'http://www.wikidata.org/entity/Q58311',
        itemLabel: 'Avigdor Lieberman',
        genderLabel: 'male',
        occupation: 'politician, chief executive officer',
        country: 'Israel',
        articles: '53',
        dateOfBirth: '1958-07-05T00:00:00Z',
        residence: 'Nokdim',
        age: '65',
    },
];

const multiValueKeys = ['residence', 'occupation', 'country'];

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

    // Decide what unique value to use for renderind the question
    function decision() {
        if (questionNum == limit) {
            setLimit((prevLimit) => prevLimit + 2);
            navigation.navigate('GuessScreen', { name: data[0].itemLabel, imageUrl: data[0].imageLabel, questionCount: questionNum });
        }

        let probabilities = {};
        // Asumeing all object have the same attributes
        let keys = Object.keys(data[0]);
        keys = keys.filter((key) => key != 'itemLabel' && key != 'item' && key != 'articles' && key != 'imageLabel');
        // Iterating on every key (column) in the data
        keys.forEach((key) => {
            // Find the probabilities for each of the unique value in the data
            for (let i = 0; i < data.length; i++) {
                // Check if the key is an array of values
                if (multiValueKeys.includes(key)) {
                    let subs = data[i][key].split(', ');
                    // Calculate the probabilities of each unique value in the array
                    for (let j = 0; j < subs.length; j++) {
                        if (!probabilities[subs[j]] && data[i][key]) {
                            let probability =
                                data.filter((o) => {
                                    let subsToCompare = o[key].split(', ');
                                    if (subsToCompare.includes(subs[j])) {
                                        return o;
                                    }
                                }).length / data.length;
                            probabilities[subs[j]] = { probability, key };
                        }
                    }
                } else {
                    // Calculate the probability of the individual value
                    if (!probabilities[data[i][key]] && data[i][key]) {
                        let probability = data.filter((o) => o[key] == data[i][key]).length / data.length;
                        probabilities[data[i][key]] = { probability, key };
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

    function yesPressHandler() {
        if (multiValueKeys.includes(key)) {
            setData((prevData) =>
                prevData.filter((item) => {
                    let subs = item[key].split(', ');
                    for (let i = 0; i < subs.length; i++) {
                        if (subs.includes(value)) {
                            return item;
                        }
                    }
                })
            );
        } else {
            setData((prevData) => prevData.filter((item) => item[key] == value));
        }
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('yes');
        getPidAndQid(key.replace('Label', ''), value, 'yes');
    }

    function noPressHandler() {
        if (multiValueKeys.includes(key)) {
            setData((prevData) =>
                prevData.filter((item) => {
                    let subs = item[key].split(', ');
                    for (let i = 0; i < subs.length; i++) {
                        if (!subs.includes(value)) {
                            return item;
                        }
                    }
                })
            );
        } else {
            setData((prevData) => prevData.filter((item) => item[key] != value));
        }
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('no');
        getPidAndQid(key.replace('Label', ''), value, 'no');
    }

    function dontKnowPressHandler() {
        if (multiValueKeys.includes(key)) {
            setData((prevData) => {
                for (let i = 0; i < prevData.length; i++) {
                    // Split the multi value key to substrings
                    let subs = prevData[i][key].split(', ');
                    // Filter the desired value
                    subs = subs.filter((s) => s != value);
                    // Set the new multi value key as a string to the object
                    prevData[i][key] = subs.join(', ');
                }
                return prevData;
            });
        } else {
            setData((prevData) => {
                for (let i = 0; i < prevData.length; i++) {
                    if (prevData[i][key] == value) {
                        prevData[i][key] = null;
                    }
                }
                return prevData;
            });
        }
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

    function queryBuilder(additions = '', notAdditions = '') {
        const queryDispatcher = new SPARQLQueryDispatcher(additions, notAdditions);
        queryDispatcher.query().then((results) => {
            setData(results);
        });
    }

    useEffect(() => {
        //queryBuilder();
        setData(miniData);
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
            setQuestion("is your character's " + (key ? key.replace('Label', '') : '') + ' is ' + value + '?');
        } catch (error) {
            // Catch block will run when data will be empty
            if (!isQueried) {
                //console.log(queryAdds);
                //console.log(queryNots);
                // Do not send the request for now...
                //queryBuilder(queryAdds, queryNots);
                setIsQueried(true);
            } else {
                navigation.navigate('GameOverScreen', { result: 'incorrect', questionCount: questionNum });
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
