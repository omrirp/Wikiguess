import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
                }
                android_ripple={{ color: '#1b1ebd' }}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonInnerContainer: {
        backgroundColor: '#4957d3',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize:20
    },
    pressed: {
        opacity: 0.75,
    },
});
