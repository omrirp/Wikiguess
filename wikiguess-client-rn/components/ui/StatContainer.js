import { View, Text, StyleSheet } from 'react-native';

export default function StatContainer({ children, style, header }) {
    return (
        <View style={[styles.container, style ? style : null]}>
            {header ? <Text style={styles.header}>{header}</Text> : null}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#999999',
        //borderWidth: 3,
        //borderColor: '#525252',
        //borderRadius: 16,
        width: '95%',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        color: '#2f9a69',
        marginBottom: 8,
        fontWeight: 'bold',
    },
});
