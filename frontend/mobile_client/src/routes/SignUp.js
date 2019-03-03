import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import SignUpForm from '../containers/SignUpForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
    },
});
const SignUp = () => (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
            <Image source={require('../Images/logo.png')} style={styles.logo} />
        </View>
        <SignUpForm />
    </KeyboardAvoidingView>
);

export default SignUp;