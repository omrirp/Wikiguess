import { View, Text, StyleSheet } from 'react-native';

export default function PrimaryHeader({ children, textStyle }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={[styles.headerText, textStyle ? textStyle : null]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        margin: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
});
