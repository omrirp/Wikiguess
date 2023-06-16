import { Text, StyleSheet, Pressable } from 'react-native';

export default function SecondaryButton({ children, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : {})}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Fredoka-SemiBold',
        color: '#0284c7',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    pressed: {
        opacity: 0.75,
    },
});
