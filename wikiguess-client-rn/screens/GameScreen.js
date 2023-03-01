import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';

const dataJason = [
    { name: 'avi', age: 28, grade: 90, gender: 'male' },
    { name: 'dani', age: 25, grade: 90, gender: 'male' },
    { name: 'benny', age: 27, grade: 87, gender: 'male' },
    { name: 'shmulik', age: 26, grade: 74, gender: 'male' },
    { name: 'rivka', age: 25, grade: 70, gender: 'female' },
    { name: 'mazal', age: 28, grade: 95, gender: 'female' },
];

let limit = 4;

export default function GameScreen({ navigation }) {
    const [questionNum, setQuestionNum] = useState(1);
    const [question, setQuestion] = useState('');
    const [data, setData] = useState(dataJason);
    const [key, setKey] = useState(null);
    const [value, setValue] = useState(null);
    const [lastAnswer, setLastAnswer] = useState('yes');

    // Decide what unique value to use for renderind the question
    function decision() {
        if (questionNum == limit) {
            limit += 2;
            navigation.navigate('GuessScreen', { name: data[0].name });
        }

        let probabilities = {};
        // Asumeing all object have the same attributes
        let keys = Object.keys(data[0]);
        keys = keys.filter((key) => key != 'name');

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

        //console.log('probabilities:');
        //console.log(probabilities);
        //console.log('data:');
        //console.log(data);

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
    }

    function noPressHandler() {
        setData((prevData) => prevData.filter((item) => item[key] != value));
        setQuestionNum((prev) => prev + 1);
        setLastAnswer('no');
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

    useEffect(() => {
        //let entropyObj = calculateEntropy(data);
        let [decidedKey, decidedValue] = decision();
        //let askobj = { key: decidedKey, value: decidedValue };
        //console.log('ask:', askobj);
        setKey(decidedKey);
        setValue(decidedValue);
        setQuestion('is you charectar ' + key + ' is ' + value + '?');
    }, [data, key, value, questionNum]);

    return (
        <View style={styles.rootContainer}>
            <View style={styles.avatarContainer}>
                <Avatar lastAnswer={lastAnswer} />
            </View>
            <View style={styles.questionContainer}>
                <Question questionNum={questionNum} questionText={question} />
            </View>
            <View style={styles.buttunsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={yesPressHandler}>Yes</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={noPressHandler}>No</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={dontKnowPressHandler}>Don't know</PrimaryButton>
                </View>
            </View>
        </View>
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
