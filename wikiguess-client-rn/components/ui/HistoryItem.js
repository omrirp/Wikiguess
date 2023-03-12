import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function historyItem({ date, questionCount, character }) {
    const [dateObj, setDateObj] = useState(new Date(date));

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <View style={styles.textItem}>
                    <Text style={styles.characterText}>{character} :</Text>
                </View>
                <View style={styles.textItem}>
                    <Text style={styles.questionCountText}>{questionCount} questions</Text>
                </View>
            </View>
            <Text>on {dateObj.toDateString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginHorizontal: 18,
        marginVertical: 8,
        paddingBottom: 4,
        alignItems: 'center',
    },
    characterText: {
        fontSize: 21,
        marginBottom: 5,
    },
    questionCountText: {
        fontSize: 18,
    },
    upperContainer: {
        flexDirection: 'row',
    },
    textItem: {
        marginHorizontal: 5,
    },
});
