import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import axios from 'axios';

export default function SignUpScreen({ navigation }) {
    const [emailText, setemailText] = useState('');
    const [userNameText, setUserNameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [passwordConText, setPasswordConText] = useState('');

    function emailInputHandler(enteredText) {
        setemailText(enteredText);
    }

    function userNameTextHandler(enteredText) {
        setUserNameText(enteredText);
    }

    function passwordTextHandler(enteredText) {
        setPasswordText(enteredText);
    }

    function passwordConTextHandler(enteredText) {
        setPasswordConText(enteredText);
    }

    function signUpPressHandler() {
        if (passwordText === passwordConText) {
            let user = {
                userEmail: emailText,
                userName: userNameText,
                password: passwordText,
            };
            console.log(user);
            axios
                .post('http://proj.ruppin.ac.il/cgroup8/prod/api/players/signup', user)
                .then((res) => {
                    delete res.data.Password;
                    AsyncStorage.setItem('user', JSON.stringify(res.data));
                    navigation.navigate('MainMenuScreen');
                })
                .catch((error) => {
                    console.log(error);
                });
            //navigation.navigate('MainMenuScreen');
        }
    }

    function toLogInHandler() {
        navigation.navigate('LogInScreen');
    }

    return (
        <GradientBackground>
            <ScrollView style={styles.screen}>
                <KeyboardAvoidingView style={styles.screen} behavior='position'>
                    <View style={styles.rootContainer}>
                        <PrimaryHeader>Sign Up</PrimaryHeader>
                        <View style={styles.inputesContainer}>
                            <PrimaryTextInput placeholder={'Email Adress'} onChangeText={emailInputHandler} />
                            <PrimaryTextInput placeholder={'User Name'} onChangeText={userNameTextHandler} />
                            <PrimaryTextInput placeholder={'Password'} onChangeText={passwordTextHandler} secureTextEntry={true} />
                            <PrimaryTextInput placeholder={'Confirm Password'} onChangeText={passwordConTextHandler} secureTextEntry={true} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={signUpPressHandler}>Sign Up!</PrimaryButton>
                        </View>
                        <View style={styles.footerContainer}>
                            <SecondaryButton onPress={toLogInHandler}>Already registered? Log in here!</SecondaryButton>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
    },
    inputesContainer: {
        marginTop: 25,
        marginHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 40,
        marginHorizontal: 50,
    },
    footerContainer: {
        marginTop: 40,
    },
});
