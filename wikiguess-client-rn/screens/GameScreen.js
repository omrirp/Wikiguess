import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';

const dataJason = [
    { name: 'avi', age: 28, grade: 90, gender: 'male' },
    { name: 'dani', age: 25, grade: 90, gender: 'male' },
    { name: 'benny', age: 27, grade: 87, gender: 'male' },
    { name: 'shmulik', age: 26, grade: 85, gender: 'male' },
    { name: 'rivka', age: 25, grade: 70, gender: 'female' },
    { name: 'mazal', age: 28, grade: 95, gender: 'female' },
];

export default function GameScreen() {
    const [questionNum, setQuestionNum] = useState(1);
    const [question, setQuestion] = useState('is your Charectes gender is male?');
    const [data, setData] = useState(dataJason);
    const [lastAnswer, setLastAnswer] = useState('yes');

    // Decide what unique value to use for renderind the question
    function decision() {
        let probabilities = {};
        // Asumeing all object have the same attributes
        let keys = Object.keys(data[0]);

        // Iterating on every key (column) in the data
        keys.forEach((key) => {
            // Find the probabilities for each of the unique value in the data
            for (let i = 0; i < data.length; i++) {
                if (!probabilities[data[i][key]]) {
                    let probability = data.filter((o) => o[key] === data[i][key]).length / data.length;
                    probabilities[data[i][key]] = { probability, key };
                }
            }
        });
        // Result for probabilities- {unique valeu: probability, ...}
        //console.log(probabilities);

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

    useEffect(() => {
        //let entropyObj = calculateEntropy(data);
        let [key, value] = decision();
        setQuestion('is you charectar ' + key + ' is ' + value + '?');
    }, [data]);

    return (
        <View style={styles.rootContainer}>
            <View style={styles.avatarContainer}>
                <Avatar />
            </View>
            <View style={styles.questionContainer}>
                <Question questionNum={questionNum} questionText={question} />
            </View>
            <View style={styles.buttunsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Yes</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>No</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Don't know</PrimaryButton>
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
        borderWidth: 1,
    },
    questionContainer: {
        flex: 1,
        borderWidth: 1,
    },
    buttunsContainer: {
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 36,
    },
    buttonContainer: {
        marginTop: 6,
    },
});
