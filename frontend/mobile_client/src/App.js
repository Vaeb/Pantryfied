/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, Button,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

const instructions = Platform.select({
    // Knows which platform you are on and shows a specific message
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev WORD menu',
});

// type Props = {};
// export default class App extends Component<Props> {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>Welcome to React Native!</Text>
//                 <Text style={styles.instructions}>To get started, edit App.js</Text>
//                 <Text style={styles.instructions}>{instructions}</Text>
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

class HomeScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return <Button title="Go to Login page" onPress={() => navigate('Login')} />;
    }
}
// static navigationOptions = { // This is used as the header bar (where the back arrow goes on the top nav bar)
//     title: 'Welcome to Pantryfied', // Falls under the class bit & above render
// };

const MainNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    Login: { screen: Login },
});

const App = createAppContainer(MainNavigator);

export default App;
