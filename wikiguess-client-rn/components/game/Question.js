import { View, Text, StyleSheet } from 'react-native';

export default function Question({ questionNum, questionText }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                <Text style={styles.questionNum}>#{questionNum} </Text>
                <Text>{questionText}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#83db9d',
        borderRadius: 8,
        elevation: 4,
    },
    text: {
        fontSize: 30,
    },
    questionNum: {
        fontWeight: 'bold',
    },
});
