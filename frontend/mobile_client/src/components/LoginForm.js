import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/* How to install:
 https://stackoverflow.com/questions/42420931/how-to-use-react-native-vector-icons
 */

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'flex-end', // https://reactnativecode.com/justifycontenton-style-explained/
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 15,
        color: '#fff',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#rgba(1,1,1,0.3)',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: '#fff',
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37,
    },
});

const LoginForm = () => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Icon name="ios-person-outline" size={28} color={rgba(255, 255, 255, 0.3)} style={styles.inputIcon} />
        <TextInput
            style={styles.input}
            placeholder="Enter: username / email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next" // changes keyboard button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            keyboardType="email-address" // Changes keyboard settings
            autoCapitalize="none"
            autoCorrect={false}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter: password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            secureTextEntry
        />

        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </View>
);
export default LoginForm;
