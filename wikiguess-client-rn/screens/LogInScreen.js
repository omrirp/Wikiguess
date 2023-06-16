import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import PrimaryTextInput from '../components/ui/PrimaryTextInput';
import PrimaryButton from '../components/ui/PrimaryButton';
import SecondaryButton from '../components/ui/SecondaryButton';
import GradientBackground from '../components/ui/GradientBackground';
import PrimaryHeader from '../components/ui/PrimaryHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInScreen({ navigation }) {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [invalidEorP, setInvalidEorP] = useState('');

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

        if (toggleCheckBox) {
            AsyncStorage.setItem('rememberMe', JSON.stringify(user));
        } else {
            AsyncStorage.removeItem('rememberMe');
        }

        axios
            .post('http://proj.ruppin.ac.il/cgroup8/prod/api/players/login', user)
            .then((res) => {
                delete res.data.Password;
                AsyncStorage.setItem('user', JSON.stringify(res.data));
                navigation.navigate('MainMenuScreen');
            })
            .catch((error) => {
                setInvalidEorP(<Text style={{ color: '#9a0000' }}>* Invalid email or password</Text>);
            });
    }

    function toSignupHandler() {
        navigation.navigate('SignUpScreen');
    }

    function rememberMeHandler() {
        setToggleCheckBox(!toggleCheckBox);
    }

    useEffect(() => {
        async function isRemembered() {
            let userdetails = JSON.parse(await AsyncStorage.getItem('rememberMe'));
            if (userdetails) {
                setEmailText(userdetails.userEmail);
                setPasswordText(userdetails.password);
                setToggleCheckBox(true);
            }
        }
        isRemembered();
    }, []);

    return (
        <GradientBackground>
            <ScrollView style={styles.rootContainer}>
                <KeyboardAvoidingView style={styles.rootContainer} behavior='position'>
                    <View style={styles.rootContainer}>
                        <PrimaryHeader textStyle={styles.headerText}>Log In</PrimaryHeader>
                        <View style={styles.inputsContainer}>
                            {invalidEorP}
                            <PrimaryTextInput
                                placeholder={'Email'}
                                onChangeText={useEmailTextHanler}
                                value={emailText}
                            />
                            <PrimaryTextInput
                                placeholder={'Password'}
                                onChangeText={passwordTextHandler}
                                secureTextEntry={true}
                                value={passwordText}
                            />
                            <CheckBox
                                title='Remember me'
                                checked={toggleCheckBox}
                                onPress={rememberMeHandler}
                                containerStyle={{ backgroundColor: 'none', borderWidth: 0 }}
                                checkedColor='#0e7490'
                                uncheckedColor='black'
                                //textStyle={{ fontFamily: 'Fredoka-SemiBold' }}
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
    headerText: {
        fontFamily: 'Fredoka-SemiBold',
    },
});
