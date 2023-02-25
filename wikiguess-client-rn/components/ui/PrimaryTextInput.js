import { View, TextInput, StyleSheet } from 'react-native';

export default function PrimaryTextInput({ placeholder, onChangeText }) {
    return (
        <View>
            <TextInput placeholder={placeholder} onChangeText={onChangeText} style={styles.input} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        height: 50,
        margin: 4,
        fontSize: 20,
        paddingLeft: 4,
    },
});
