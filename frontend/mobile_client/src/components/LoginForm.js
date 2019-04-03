import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.navButtonPressed = this.navButtonPressed.bind(this);
  }

  navButtonPressed() {
    this.props.navigation.navigate("Main");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <Icon name="ios-person" size={24} color="rgba(255, 255, 255, 0.3)" style={styles.inputIconPerson} />
          <Icon name="ios-lock" size={24} color="rgba(255, 255, 255, 0.3)" style={styles.inputIconLock} />
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
          <TouchableOpacity style={styles.buttonContainer} onPress={this.navButtonPressed}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text> Don't Have an account yet? </Text>
            <Text style={styles.signUpText}> Sign up</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(LoginForm);

/* How to install React Icons:
 https://stackoverflow.com/questions/42420931/how-to-use-react-native-vector-icons
 https://oblador.github.io/react-native-vector-icons/ -- List of icons to use
 https://alligator.io/react/use-native-icons/ - Tips
 */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    bottom: 100,
    justifyContent: 'center', // https://reactnativecode.com/justifycontenton-style-explained/
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 15,
    color: '#fff',
    paddingLeft: 35,
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
    borderColor: '#rgba(1,1,1,0.3)',
  },
  inputIconPerson: {
    top: 55,
    left: 8,
  },
  inputIconLock: {
    top: 85,
    left: 8,
  },
  signUpContainer: {
    alignItems: 'center',
    paddingTop: 150,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
  },
});
