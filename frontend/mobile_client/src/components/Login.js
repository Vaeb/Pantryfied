import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, KeyboardAvoidingView,
} from 'react-native';
import LoginForm from './LoginForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28BAA5', // Same color as logo theme
    },
    logoContainer: {
        alignItems: 'center', // https://reactnativecode.com/apply-alignitems-on-view-explained/
    },
    logo: {
        width: 200,
        height: 200,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        padding: 10,
    },
});

const Login = () => (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../Images/logo.png')} style={styles.logo} />
                {/* <Text style={styles.title}> Welcome to Pantry Fied! </Text> */}
            </View>
            <View style={styles.formContainer} />
            <LoginForm />
        </View>
    </KeyboardAvoidingView>
);
// <LoginFrom/> calls LoginForm function

export default Login;

// TO DO:
// Add Logo and image background
/*
const Login = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('src/Images/logo.png')} />
            OR
                    <Image style={styles.logo} source={require("../../Images/logo.png")} />

            <Text style={styles.title}> Login screen! </Text>
        </View>
        <View style={styles.formContainer} />
    </View>
);
*/
