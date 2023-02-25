import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';

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
        // const user = {
        //     email: emailText,
        //     userName: userNameText,
        //     password: passwordText,
        //     passwordCon: passwordConText,
        // };
        // console.log(user);
        navigation.navigate('MainMenuScreen');
    }

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={styles.rootContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Sign Up</Text>
                    </View>
                    <View style={styles.inputesContainer}>
                        <PrimaryTextInput placeholder={'Email Adress'} onChangeText={emailInputHandler} />
                        <PrimaryTextInput placeholder={'User Name'} onChangeText={userNameTextHandler} />
                        <PrimaryTextInput placeholder={'Password'} onChangeText={passwordTextHandler} />
                        <PrimaryTextInput placeholder={'Confirm Password'} onChangeText={passwordConTextHandler} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={signUpPressHandler}>Sign Up!</PrimaryButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        margin: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    inputesContainer: {
        marginTop: 25,
        marginHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 40,
        marginHorizontal: 50,
    },
});
