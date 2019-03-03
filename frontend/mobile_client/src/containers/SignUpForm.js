import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'flex-start',
        bottom: 100,
    },
    input: {
        height: 40,
        marginBottom: 15,
        color: 'black',
        paddingLeft: 35,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    buttonContainer: {
        backgroundColor: '#rgba(40,186,163, 1)',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: '#fff',
        borderColor: '#28BAA5',
    },
    inputIconEmail: {
        top: 81,
        left: 8,
    },
    inputIconLock: {
        top: 110,
        left: 8,
    },
    inputIconPerson: {
        top: 140,
        left: 8,
    },
});

const SignUpForm = () => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Icon name="ios-mail" size={24} color="#28BAA5" style={styles.inputIconEmail} />
        <Icon name="ios-lock" size={24} color="#28BAA5" style={styles.inputIconLock} />
        <Icon name="ios-person" size={24} color="#28BAA5" style={styles.inputIconPerson} />
        <TextInput
            style={styles.input}
            placeholder="Email"
            returnKeyType="next" // changes keyboard button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            keyboardType="email-address" // Changes keyboard settings
            autoCapitalize="none"
            autoCorrect={false}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            secureTextEntry
        />
        <TextInput
            style={styles.input}
            placeholder="First name"
            returnKeyType="go" // changes keyboard button
            // I think once they hit go, we can move them onto the next screen, thus removing the "done" button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            autoCorrect={false}
        />
        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
    </View>
);

export default SignUpForm;
