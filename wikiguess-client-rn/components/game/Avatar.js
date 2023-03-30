import { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function Avatar({ lastAnswer }) {
    const [image, setImage] = useState();

    useEffect(() => {
        switch (lastAnswer) {
            case 'yes': {
                setImage(<Image source={require('../../assets/images/wikimonsterHappy.png')} style={styles.image} />);
                break;
            }
            case 'no': {
                setImage(<Image source={require('../../assets/images/wikimonsterSad.png')} style={styles.image} />);
                break;
            }
            case "don't know": {
                setImage(<Image source={require('../../assets/images/wikimonsterThinking.png')} style={styles.image} />);
                break;
            }
            default:
                setImage(<Image source={require('../../assets/images/wikimonsterHappy.png')} style={styles.image} />);
                break;
        }
    }, [lastAnswer]);

    return <View style={styles.container}>{image}</View>;
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200,
    },
});
