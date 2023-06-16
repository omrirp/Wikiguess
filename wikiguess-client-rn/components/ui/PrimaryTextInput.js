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
        borderWidth: 2,
        borderColor: '#0e7490',
        backgroundColor: '#f5f5f5',
        borderRadius: 14,
        height: 50,
        margin: 4,
        fontSize: 20,
        padding: 4,
        fontFamily: 'Fredoka-Regular',
    },
});
