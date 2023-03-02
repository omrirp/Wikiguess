import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function SecondaryButton({ children, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : {})}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5b81d2',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});
