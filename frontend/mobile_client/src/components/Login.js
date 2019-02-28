import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, TextInput,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5DBCD2',
    },
    logoContainer: {
        alignItems: 'center',
        // https://reactnativecode.com/apply-alignitems-on-view-explained/
    },
    logo: {
        width: 100,
        height: 100,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
});

const Login = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Text style={styles.title}> Login screen! </Text>
        </View>
        <View style={styles.formContainer} />
    </View>
);

export default Login;

// TO DO:
// Add Logo and image background
/*
const Login = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('src/Images/logo.png')} />
            <Text style={styles.title}> Login screen! </Text>
        </View>
        <View style={styles.formContainer} />
    </View>
);
*/
