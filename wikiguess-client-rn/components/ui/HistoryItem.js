import { View, Text } from 'react-native';

export default function historyItem({ date, questionCount, character }) {
    return (
        <View>
            <Text>{date}</Text>
            <Text>{questionCount}</Text>
            <Text>{character}</Text>
        </View>
    );
}
