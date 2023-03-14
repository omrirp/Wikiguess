import { View, Text, StyleSheet } from 'react-native';

export default function globStatItem({ character, avgQuestionCount }) {
    return (
        <View style={styles.container}>
            <View style={styles.textItem}>
                <Text style={styles.characterText}>{character}:</Text>
            </View>
            <View style={styles.textItem}>
                <Text style={styles.questionCountText}>
                    {'\u2023'} AVG number of questions- <Text style={{ color: '#9a0000', fontWeight: 'bold' }}>{avgQuestionCount}</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#2f9a69',
        marginHorizontal: 18,
        marginVertical: 8,
        paddingBottom: 4,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    characterText: {
        fontSize: 21,
        marginBottom: 5,
        color: '#00649c',
        fontWeight: 'bold',
    },
    questionCountText: {
        fontSize: 18,
    },
    textItem: {
        flex: 1,
        marginHorizontal: 5,
    },
});
