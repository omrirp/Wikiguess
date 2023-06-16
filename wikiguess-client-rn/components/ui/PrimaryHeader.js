import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrimaryHeader({ children, textStyle, viewStyle }) {
    return (
        <View style={[styles.headerContainer, viewStyle ? viewStyle : null]}>
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
