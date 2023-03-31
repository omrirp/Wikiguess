import { View, TextInput, StyleSheet } from 'react-native';

export default function PrimaryTextInput({ placeholder, onChangeText, secureTextEntry, value }) {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={styles.input}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                value={value}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 4,
        height: 50,
        margin: 4,
        fontSize: 20,
        padding: 4,
    },
});
