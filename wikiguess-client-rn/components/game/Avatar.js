import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Avatar({ lastAnswer }) {
    const [image, setImage] = useState();


    if (lastAnswer == 'yes') {
        setImage(<Image />)
    }

    return (
        <View style={styles.container}>
            {image}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
