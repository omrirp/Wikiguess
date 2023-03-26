import { View, StyleSheet, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { useState } from 'react';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import axios from 'axios';

export default function LogInScreen({ navigation }) {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    function useEmailTextHanler(enteredText) {
        setEmailText(enteredText);
    }

    function passwordTextHandler(enteredText) {
        setPasswordText(enteredText);
    }

    function logInPressHandler() {
        const user = {
            userEmail: emailText.toLowerCase(),
            password: passwordText,
        };
        axios
            .post('http://proj.ruppin.ac.il/cgroup8/prod/api/players/login', user)
            .then((res) => {
                delete res.data.Password;
                AsyncStorage.setItem('user', JSON.stringify(res.data));
                navigation.navigate('MainMenuScreen');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function toSignupHandler() {
        navigation.navigate('SignUpScreen');
    }

    return (
        <GradientBackground>
            <ScrollView style={styles.rootContainer}>
                <KeyboardAvoidingView style={styles.rootContainer} behavior='position'>
                    <View style={styles.rootContainer}>
                        <PrimaryHeader>Log In</PrimaryHeader>
                        <View style={styles.inputsContainer}>
                            <PrimaryTextInput placeholder={'Email'} onChangeText={useEmailTextHanler} />
                            <PrimaryTextInput
                                placeholder={'Password'}
                                onChangeText={passwordTextHandler}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={logInPressHandler}>Log In!</PrimaryButton>
                        </View>
                        <View style={styles.footerContainer}>
                            <SecondaryButton onPress={toSignupHandler}>Not registered? Sign up now!</SecondaryButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    inputsContainer: {
        marginHorizontal: 20,
        marginVertical: 40,
    },
    buttonContainer: {
        marginVertical: 8,
        marginHorizontal: 50,
    },
    footerContainer: {
        marginTop: 100,
    },
});
