import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../components/game/Avatar';
import Question from '../components/game/Question';
import PrimaryButton from '../components/ui/PrimaryButton';

const dataJason = [
    { name: 'avi', age: 28, grade: 85, gender: 'male' },
    { name: 'benny', age: 27, grade: 90, gender: 'male' },
    { name: 'shmulik', age: 27, grade: 96, gender: 'male' },
    { name: 'rivka', age: 25, grade: 80, gender: 'female' },
    { name: 'mazal', age: 28, grade: 85, gender: 'female' },
];

export default function GameScreen() {
    const [questionNum, setQuestionNum] = useState(1);
    const [lastAnswer, setLastAnswer] = useState('yes');
    const [question, setQuestion] = useState('is your Charectes gender is male?');
    const [data, setData] = useState(dataJason);

    useEffect(() => {}, []);

    function decision() {
        let probabilities = {};

        // Find the probabilities for each of the unique values within the
        // Result for probabilities- {unique valeu: probability, ...}
        for (let i = 0; i < data.length; i++) {
            if (!probabilities[data[i][key]]) {
                probabilities[data[i][key]] = data.filter((o) => o[key] === data[i][key]).length / data.length;
            }
        }

        // Find the unique value that will be to closest to cut the data to 50%
        let probKeys = Object.keys(probabilities);
        let toAsk;
        let cut = 1;
        probKeys.forEach((p) => {
            let calc = Math.abs(probabilities[p] - 0.5);
            if (cut > calc) {
                cut = calc;
                toAsk = p;
            }
        });

        return toAsk;
    }

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
