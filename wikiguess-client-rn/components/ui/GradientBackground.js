import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet } from 'react-native';

export default function GradientBackground({ children }) {
    return (
        <LinearGradient colors={['#dadada', '#0a0a0a']} style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/images/wikiguessBackgroung.png')}
                resizeMode='cover'
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                {children}
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.7,
    },
});
