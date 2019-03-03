import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, KeyboardAvoidingView, ImageBackground,
} from 'react-native';
import LoginForm from '../containers/LoginForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28BAA5', // Same color as logo theme
    },
    logoContainer: {
        alignItems: 'center', // https://reactnativecode.com/apply-alignitems-on-view-explained/
    },
    logo: {
        width: 300,
        height: 240,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        padding: 10,
    },
});

/* BUG - when using the keyboard, the button for the login doesnt move up the screen properly, So i moved everything higher up */
/* <ImageBackground source={require('../Images/whiteBackgroundLogin.png')} style={styles.backgroundImage} /> * Does not like to work properly:) */

const Login = () => (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.logoContainer}>
            <Image source={require('../Images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.formContainer} />
        <LoginForm />
    </KeyboardAvoidingView>
);
// <LoginFrom/> calls LoginForm function

export default Login;
