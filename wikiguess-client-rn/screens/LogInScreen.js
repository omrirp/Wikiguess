import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import PrimaryButton from '../components/ui/PrimaryButton';
import axios from 'axios';
import apiUrls from '../utils/apiURL';

export default function LogInScreen({ navigation }) {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    function useEmailTextHanler(enteredText) {
        setEmailText(enteredText);
    }

    function passwordTextHandler(enteredText) {
        setPasswordText(enteredText);
    }

    function logInPressHandler() {
        // const user = {
        //     userEmail: emailText,
        //     password: passwordText,
        // };
        // console.log(user);
        navigation.navigate('MainMenuScreen');
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Log In</Text>
            </View>
            <View style={styles.inputsContainer}>
                <PrimaryTextInput placeholder={'Email'} onChangeText={useEmailTextHanler} />
                <PrimaryTextInput placeholder={'Password'} onChangeText={passwordTextHandler} />
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={logInPressHandler}>Log In!</PrimaryButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    inputsContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    buttonContainer: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 50,
    },
});
