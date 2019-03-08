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
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { PantryfiedContext } from './context/PantryfiedContext';
import AppNavigation from './navigation/AppNavigation';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        username: undefined,
        password: undefined,
        loginToken: undefined,
      },
    };
  }

  render() {
    return (
      <PantryfiedContext.Provider
        value={{
          user: this.state.userData,
        }}
      >
        <AppNavigation screenProps={this.props} />
      </PantryfiedContext.Provider>
    );
  }
}

App.contextType = PantryfiedContext;
