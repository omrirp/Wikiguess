import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import axios from 'axios';
import { isEmail } from 'validator';

export default function SignUpScreen({ navigation }) {
    const [emailText, setemailText] = useState('');
    const [userNameText, setUserNameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [passwordConText, setPasswordConText] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [passwordMissmatch, setPasswordMissmatch] = useState('');
    const [errorText, setErrorText] = useState('');

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
        // Check if the text is a valid email adress
        if (!isEmail(emailText)) {
            setInvalidEmail(<Text style={styles.warrning}>* Invalid email adress</Text>);
            return;
        }

        // Check if password confirmed
        if (passwordText !== passwordConText) {
            setPasswordMissmatch(<Text style={styles.warrning}>* Please check your confirmed password</Text>);
            return;
        }

        let user = {
            userEmail: emailText.toLowerCase().trim(),
            userName: userNameText.trim(),
            password: passwordText.trim(),
        };
        axios
            .post('http://proj.ruppin.ac.il/cgroup8/prod/api/players/signup', user)
            .then((res) => {
                delete res.data.Password;
                AsyncStorage.setItem('user', JSON.stringify(res.data));
                navigation.navigate('MainMenuScreen');
            })
            .catch((error) => {
                setErrorText(
                    <Text style={styles.warrning}>
                        * Something went wrong while signing up. Please check your internet connection
                    </Text>
                );
            });
        //navigation.navigate('MainMenuScreen');
    }

    function toLogInHandler() {
        navigation.navigate('LogInScreen');
    }

    return (
        <GradientBackground>
            <ScrollView style={styles.screen}>
                <KeyboardAvoidingView style={styles.screen} behavior='position'>
                    <View style={styles.rootContainer}>
                        <PrimaryHeader textStyle={styles.headerText}>Sign Up</PrimaryHeader>
                        <View style={styles.inputesContainer}>
                            {invalidEmail}
                            <PrimaryTextInput placeholder={'Email Adress'} onChangeText={emailInputHandler} />
                            <PrimaryTextInput placeholder={'User Name'} onChangeText={userNameTextHandler} />
                            {passwordMissmatch}
                            <PrimaryTextInput
                                placeholder={'Password'}
                                onChangeText={passwordTextHandler}
                                secureTextEntry={true}
                            />
                            <PrimaryTextInput
                                placeholder={'Confirm Password'}
                                onChangeText={passwordConTextHandler}
                                secureTextEntry={true}
                            />
                            {errorText}
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
    headerText: {
        fontFamily: 'Fredoka-SemiBold',
    },
    warrning: {
        fontFamily: 'Fredoka-Light',
        color: '#9a0000',
    },
});
